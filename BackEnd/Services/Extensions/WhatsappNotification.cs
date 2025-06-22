using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace JetSendsServices.Extensions;
public class WhatsappNotification
{
    private readonly IConfiguration _configuration;

    public WhatsappNotification(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<bool> SendAsync(string body, string url, string to)
    {
        try
        {
            string accountSid = _configuration["appSettings:accountSid"];
            string authToken = _configuration["appSettings:authToken"];

            TwilioClient.Init(accountSid, authToken);
            var number = FormatToInternational(to);
//            var message = await MessageResource.CreateAsync(
//    body: body,
//    to: new Twilio.Types.PhoneNumber($"whatsapp:{number}"), // correct
//    from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886")

//);//
  var message = await MessageResource.CreateAsync(
        body: body,
    from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"),
    to: new Twilio.Types.PhoneNumber("whatsapp:+2348105764655")
);

            //var message = await MessageResource.CreateAsync(
            //    body: body,
            //    mediaUrl: new List<Uri> { new Uri(url) },
            //    to: new Twilio.Types.PhoneNumber(to),
            //    from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886")
            //);

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending WhatsApp message: {ex.Message}");
            return false;
        }
    }


    public static string FormatToInternational(string phoneNumber)
    {
        // Remove all whitespace or extra characters (optional but helpful)
        phoneNumber = phoneNumber.Trim();

        if (phoneNumber.StartsWith("0") && phoneNumber.Length == 11)
        {
            // Remove the leading 0 and add +234
            return "+234" + phoneNumber.Substring(1);
        }
        else if (phoneNumber.Length == 10 && !phoneNumber.StartsWith("0"))
        {
            // Directly add +234 if it's a valid 10-digit number
            return "+234" + phoneNumber;
        }
        else if (phoneNumber.StartsWith("+234") && phoneNumber.Length == 14)
        {
            // Already correctly formatted
            return phoneNumber;
        }

        // Return as-is or throw error if you want to enforce strict checks
        return phoneNumber;
    }

}
