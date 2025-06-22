using JetSend.Core.Infranstructure.Common.Enums;
using System.Text.Json.Serialization;

namespace JetSend.Core.Infranstructure.Common
{
    public class ApiResponse<TResponse>
    {
        /// <summary>
        /// The status of request
        /// </summary>
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public bool? Status { get; set; } = false;
        public StatusEnum StatusCode { get; set; }
        /// <summary>
        /// Additional information on the reponse.
        /// </summary>
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public string? Message { get; set; }
        /// <summary>
        /// The total record for the list
        /// </summary>
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public int TotalRecord { get; set; }
        /// <summary>
        /// Number of pages inline with pagesize 
        /// </summary>
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public int Pages { get; set; }
        /// <summary>
        /// Record current page number on view
        /// </summary>
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public int CurrentPageCount { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public int CurrentPage { get; set; }
        /// <summary>
        /// The contained data.
        /// </summary>
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public TResponse Data { get; set; }

        /// <summary>
        /// A list of error messages for errors that occured during processing.
        /// </summary>
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public List<string>? Errors { get; set; }

        public bool IsEmpty() => (Errors == null || Errors.Count == 0) && Data == null && Message == null;
    }

    public class ApiResponse
    {
        public ApiResponse(string _message, StatusEnum _statusCode, bool? _status)
        {
            message = _message;
            statusCode = _statusCode;
            status = _status;
        }
        public bool? status { get; set; } = false;
        public string message { get; private set; }
        public StatusEnum statusCode { get; private set; }
    }

    public class IdNameRecord
    {
        public string? Name { get; set; }
        public long Id { get; set; }
    }
    public class NameValueRecord
    {
        public string? Name { get; set; }
        public string? Value { get; set; }
    }
}
