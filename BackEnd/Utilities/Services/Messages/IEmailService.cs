
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MeetTech.Core.Utilities.Services.Messages
{
    public interface IEmailService
    {

        Task<bool> SendMail_SendGrid(string mailTo, string subject, string body, string displayName);
        // Task SendBulkMail_Message(SubscriberMessage param);
        bool SendMail_Attachment_SendGrid(string mailTo, string subject, string body, string displayName, byte[] attachment_file, string ReceiverName);
        bool IsValidKeys(string XKey);
        //Task SendBulkMail_Message(SubscriberMessage param);
        //bool SendMail_Attachment_SendGrid(string mailTo, string subject, string body, string displayName, byte[] attachment_file, string ReceiverName);
        //bool IsValidKeys(string XKey);
        //Task SendMessageToSupportAndSalesUnit(string message,string subject); //formatted message

        ////Template email
        //Task SendMail_SendGrid_Template(string mailTo, string subject, string body, string displayName,string templateId);
        //Task SendMail_SendGrid_Template_Bulk(string mailTo, string subject, string body, string displayName, string templateId);
        //and others
    }
}
