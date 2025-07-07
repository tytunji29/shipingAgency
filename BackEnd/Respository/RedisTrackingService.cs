using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using JetSend.Domain.Dtos.RequestDtos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace JetSend.Respository;


public class RedisTrackingService
{
    private readonly HttpClient _httpClient;
    private readonly string _restEndpoint;
    private readonly string _bearerToken;
    private readonly ILogger<RedisTrackingService> _logger;
    private readonly JsonSerializerOptions _jsonOptions;

    public RedisTrackingService(
        HttpClient httpClient,
        IConfiguration configuration,
        ILogger<RedisTrackingService> logger)
    {
        _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        // Validate configuration
        _restEndpoint = configuration["Upstash:RestEndpoint"]
            ?? throw new ArgumentException("Upstash:RestEndpoint is not configured");
        _bearerToken = configuration["Upstash:RestToken"]
            ?? throw new ArgumentException("Upstash:RestToken is not configured");

        // Configure HTTP client
        _httpClient.BaseAddress = new Uri(_restEndpoint);
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _bearerToken);

        // Configure JSON serialization
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
        };
    }

    public async Task StoreLocationAsync(string shipmentId, object locationData)
    {
        if (string.IsNullOrWhiteSpace(shipmentId))
            throw new ArgumentException("Shipment ID cannot be empty", nameof(shipmentId));

        if (locationData == null)
            throw new ArgumentNullException(nameof(locationData));

        try
        {
            var serializedLocation = JsonSerializer.Serialize(locationData, _jsonOptions);
            var key = $"shipment:{shipmentId}:latestLocation";

            // Upstash REST API expects commands as an array in the request body
            var command = new object[] { "SET", key, serializedLocation, "EX", 3600 }; // EX = Expire in 1 hour

            var response = await _httpClient.PostAsJsonAsync("", command, _jsonOptions);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("Failed to store location in Redis. Status: {StatusCode}, Error: {Error}",
                    response.StatusCode, errorContent);
                throw new ApplicationException($"Failed to store location: {errorContent}");
            }

            _logger.LogDebug("Successfully stored location for shipment {ShipmentId}", shipmentId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error storing location for shipment {ShipmentId}", shipmentId);
            throw new ApplicationException("Failed to store location in Redis", ex);
        }
    }

    public async Task<T?> GetLatestLocationAsync<T>(string shipmentId)
    {
        if (string.IsNullOrWhiteSpace(shipmentId))
            throw new ArgumentException("Shipment ID cannot be empty", nameof(shipmentId));

        try
        {
            var key = $"shipment:{shipmentId}:latestLocation";
            var response = await _httpClient.GetAsync($"/GET/{Uri.EscapeDataString(key)}");

            response.EnsureSuccessStatusCode();

            // First read the response as string
            var responseString = await response.Content.ReadAsStringAsync();

            // Upstash returns the value in a "result" property
            using var jsonDoc = JsonDocument.Parse(responseString);
            if (jsonDoc.RootElement.TryGetProperty("result", out var resultElement))
            {
                if (resultElement.ValueKind == JsonValueKind.String)
                {
                    // Deserialize the inner JSON string
                    return JsonSerializer.Deserialize<T>(resultElement.GetString()!, _jsonOptions);
                }
                // If not a string, try to deserialize directly
                return JsonSerializer.Deserialize<T>(resultElement.GetRawText(), _jsonOptions);
            }

            throw new ApplicationException("Invalid response format - 'result' property not found");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting location for shipment {ShipmentId}", shipmentId);
            throw;
        }
    }
}
