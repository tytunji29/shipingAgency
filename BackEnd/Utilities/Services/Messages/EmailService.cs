 
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using HttpMethod = System.Net.Http.HttpMethod;

using MeetTech.Infranstructure.Model.Configuration;
 
using System.Linq;
using MeetTech.Core.Utilities.Extensions;
using MeetTech.Core.Utilities.Statics;
using Microsoft.Extensions.Options;
using Vubids.Domain.Exceptions;
using SendGrid.Helpers.Mail;
using SendGrid;
using UtilitiesServices.Statics;

namespace MeetTech.Core.Utilities.Services.Messages
{
    public class EmailService : IEmailService
    {
        private readonly AppSettings _appSettings;
        private string SendGridAPIKEY;
        private readonly SmtpClient? _smtpServer;
        private List<EmailAddress> emailAddresses = new List<EmailAddress>();
        private readonly ISendGridClient _sendGridClient;

        public EmailService(IOptions<AppSettings> appSettings)
        {
            // _sendGridClient = sendGridClient; ISendGridClient sendGridClient
            _appSettings = appSettings.Value;
            SendGridAPIKEY =
            ConvertersHelper.ConvertByteToString(ConvertersHelper.ConvertStringToByte(_appSettings.SendGridKey));
        }
        public async Task<bool> SendMail_SendGrid(string mailTo, string subject, string body, string displayName)
        {
            if (!mailTo.IsValidEmail())
            {
                throw new ApiGenericException(GenericStrings.InvalidEmail);

            }
            bool isSent = false;

            try
            {
                //body += $"<p><br/> <b>Contact  Support Team  </b> <br/> " +
                //    $" WhatsApp Number +2348101032506 <br/> Emails: support@salestrack.app <br/> ";

                //body += $"<p> Best regards," +
                //    $"<br/><b>KAYBILL TECH Team </b> <br/> <i> <a href='https://kaybilltech.com'> KayBill Technologies, Lagos State<a/> </i> .</p>";
                var client = new SendGridClient(SendGridAPIKEY);

                string[] Emails = mailTo.Split(',');
                int le = Emails.Length;
                var from = new EmailAddress(_appSettings.EmailFrom, displayName);
                var replyto = new EmailAddress(_appSettings.ReplyTo, "Support Team");
                var to = new EmailAddress(mailTo, "");

                for (int i = 0; i <= le - 1; i++)
                {


                    if (Emails[i].Trim().IsValidEmail())
                    {

                        var email = new EmailAddress(Emails[i].Trim(), "");
                        emailAddresses.Add(email);
                    }

                }

                if (le <= 1)
                {
                    var msg = MailHelper.CreateSingleEmail(from, to, subject, "", body);

                    var response = client.SendEmailAsync(msg);
                    isSent = true;
                }
                else
                {
                    var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, emailAddresses, subject, "", body);
                    msg.ReplyTo = replyto;
                    var response = await client.SendEmailAsync(msg);

                    //Send Template Emails

                    //   var client = new SendGridClient(Options.SendGridKey);
                    //from = new EmailAddress("from@test.com", "Name");
                    //to = new EmailAddress("to@test.com");
                    //var msg2 = MailHelper.CreateSingleTemplateEmailToMultipleRecipients(from, emailAddresses, "gfhg", null);
                    ////CreateSingleTemplateEmail(from, to, templateId, dynamicTemplateData);
                    //client.SendEmailAsync(msg);
                    isSent = true;
                }


            }
            catch (Exception ex)
            {


                var errorMessage = ex.Message.ToString();

                return isSent;
            }

            return isSent;

        }

        public bool SendMail_Attachment_SendGrid(string mailTo, string subject, string body, string displayName, byte[] attachment_file, string ReceiverName)
        {
            if (!mailTo.IsValidEmail())
            {
                throw new ApiGenericException(GenericStrings.InvalidEmail);
            }
            bool isSent = false;

            try
            {

                var client = new SendGridClient(SendGridAPIKEY);


                string[] Emails = mailTo.Split(',');
                int le = Emails.Length;

                var from = new EmailAddress(_appSettings.EmailFrom, displayName);
                var to = new EmailAddress(mailTo, "");
                var plainTextContent = body;

                for (int i = 0; i <= le - 1; i++)
                {
                    if (Emails[i].Trim().IsValidEmail())
                    {


                        var email = new EmailAddress(Emails[i].Trim(), "");
                        emailAddresses.Add(email);
                    }

                }

                if (le <= 1)
                {
                    var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, "");
                    //Attach File
                    if (attachment_file != null)
                    {

                        var Statement = new SendGrid.Helpers.Mail.Attachment()
                        {
                            Content = Convert.ToBase64String(attachment_file),
                            Type = "application/pdf",
                            Filename = subject + ".pdf",
                            Disposition = "inline",
                            ContentId = "SOA"
                        };
                        msg.AddAttachment(Statement);
                    }
                    var response = client.SendEmailAsync(msg);
                    isSent = true;


                }
                else
                {
                    var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, emailAddresses, subject, plainTextContent, "");
                    //attach File

                    if (attachment_file != null)
                    {

                        var Statement = new SendGrid.Helpers.Mail.Attachment()
                        {
                            Content = Convert.ToBase64String(attachment_file),
                            Type = "application/pdf",
                            Filename = subject + ".pdf",
                            Disposition = "inline",
                            ContentId = "SOA"
                        };
                        msg.AddAttachment(Statement);
                    }
                    var response = client.SendEmailAsync(msg);
                    //Send Template Emails

                    //   var client = new SendGridClient(Options.SendGridKey);
                    //from = new EmailAddress("from@test.com", "Name");
                    //to = new EmailAddress("to@test.com");
                    //var msg2 = MailHelper.CreateSingleTemplateEmailToMultipleRecipients(from, emailAddresses, "gfhg", null);
                    ////CreateSingleTemplateEmail(from, to, templateId, dynamicTemplateData);
                    //client.SendEmailAsync(msg);
                    isSent = true;
                }


            }
            catch (Exception)
            {
                return isSent;
            }

            return isSent;

            throw new NotImplementedException();
        }

        public bool IsValidKeys(string XKey)
        {
            if (string.IsNullOrEmpty(XKey)) return false;
            var apiKey = _appSettings.APIKEY;
            if (XKey == apiKey) return true;
            return false;

        }

        //public async Task SendMessageToSupportAndSalesUnit(string formattedMessage, string subject)
        //{

        //    bool isSent = false;

        //    try
        //    {

        //        var client = new SendGridClient(SendGridAPIKEY);
        //        var from = new EmailAddress(_appSettings.EmailFrom, "SalesTrack Application");
        //        var to = new EmailAddress("salestrackapps@gmail.com", "");
        //        //emailAddresses.Add(new EmailAddress("support@salestrack.app"));
        //       // emailAddresses.Add(new EmailAddress("salestrackapps@gmail.com"));
        //        //emailAddresses.Add(new EmailAddress("kaybilltech@gmail.com"));
        //        var msg = MailHelper.CreateSingleEmail(from, to, subject, "", formattedMessage);
        //       // var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, emailAddresses, subject, "", formattedMessage);
        //        var response = await client.SendEmailAsync(msg);
        //        isSent = true;


        //    }
        //    catch (Exception ex)
        //    {


        //        var errorMessage = ex.Message.ToString();


        //    }



    }
}