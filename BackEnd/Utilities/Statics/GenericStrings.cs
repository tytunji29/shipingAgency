
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace MeetTech.Core.Utilities.Statics
{
    public class GenericStrings
    {
        public static readonly string InvalidEmail = "Invalid email address.";
        public static readonly string InvalidPhoneNumber = "Invalid phone number";
        public static readonly string InvalidPhoneNumberOrEmail = "Invalid phone number or email address";
        public static readonly string InvalidNumber = "Invalid number. The number's value should be whole numbers (digits)";
        public static readonly string SendVerificationSuccessful = "Sendig verification code successful";
        public static readonly string SendVerificationFailed = "Sendig verification code failed";

        public static readonly string InvalidEmailOrPhoneNumber = "Invalid Email or Phone number. Check it and try again";
        public static readonly string InvalidLoginCredentials = "Invalid login credentials";

        public static readonly string IdentityNotVerified = "Your identity is not verified";

        public static readonly string DeviceOrBrowserChange = "$Your device or browser has changed.Kindly verify new device or browser";
        public static readonly string InvalidToken = "$Invalid tokens ! Token expired or invalid token credentials";

        public static readonly string AccountLockOut = "";

        public static readonly string InValidCode = "Invalid verification credential";
        public static readonly string SomethingWrong = "Something went wrong.Try it again";

        public static string InvalidCourseType = "Invalid Course Type";

        public static string InvalidUserRequest = "Sorry ! You are not authorized to make this request.. Contact your store admin or  support team";
        public static string InvalidAdminUserRequest = "Sorry ! You are not an authorized user to perform or complete this task.";
         
//        public static string FormatMessageToSupport(string subject,string messageType,ClientData clientData)
//        {
//            //Create a Template for this email
//            string Message = $@"
//                    <p> Dear Admin/Support Team, </p><br/>

//                                <p> I hope this message finds you well. I am writing to inform you that we have
//                 a new client who has registered on {clientData.FromApp} Application on { GetLocalDateTime.CurrentDateTime().ToLongDateString()} at { GetLocalDateTime.CurrentTime() }
//             <br/> Please find the client details below: </p>
//               <br/> 
                
//               Client Name: {clientData.Name} <br/>
//              Email Address: {clientData.Email} <br/>
           
//            Phone Number : {clientData.PhoneNumber} <br/>
//            Subscription Plan: {clientData.SubscriptionPlan} <br/>
//            Due Date: {clientData.SubscriptionDueDate} <br/>
//            Promo Code : {clientData.PromoCode} <br/>
             
//<p> We would like to extend a warm welcome to our new client and ensure that they have a seamless
//experience with our services. 
//To facilitate this, we kindly request that you take the following actions: </p>
// <br/>
//  <p> 1. <b> Onboarding Assistance: If the client is new to our application, consider offering them onboarding resources 
//or guidance to help them make the most of our services. </b></p>
//<p> 2. <b> Follow-Up: After the initial contact, please follow up with the client to ensure they are satisfied with our services and 
//inquire if they have any additional needs. </b></p>
//<br/>
//<p> We greatly value our clients, and it's essential that we provide them with exceptional 
//support and service. Your prompt attention to this matter will contribute to a positive client experience and 
//long-term satisfaction. </p>

//<p>If you have any questions or require additional information regarding this new client subscription, 
//please do not hesitate to reach out to your team lead </p>
//<br/>

//";
//            return Message;
//        }
//        //we're extending an invitation to explore the features of the SalesTrack application,
        //create an account and install SalesTrack application for your business by getting started here  https://getstarted.salestrack.app .

        //As we move forward together, we highly value your perspective.Your feedback plays a pivotal role in shaping our services.Feel free to reach out to us via WhatsApp(+2348101032506) , Email address(sales @salestrack.app), or share your feedback on our dedicated feedback page https://www.salestrack.app Your input is greatly appreciated. 
  //Thank you for sharing your valuable business knowledge with us
        public static string SurveyWhatsAppMessage(string Name)
        {
            string Message = $@"
                    *Dear {Name.Trim()}*,
  We genuinely *appreciate* your time and insights in answering our  survey  questions. Your input will help KAYBILL TECHNOLOGIES, tailor our services to suit your business needs better.
  
 *SalesTrack app* is a tool needed for your business management; you will get daily/weekly notifications on total sales amount,  sold items,  Out of stock or expired products. Manage your POS, stocks,  taking inventory, expenses, pre orders, customers etc
 
 Sir / Ma, choose any package,create account here https://subscribe.salestrack.app And enjoy promo offer  on *Basic and Premium Plan* Subscribe for one Month and get extra 1 month and 2 months respectively.
  *Also there is an offer for you to customize SalesTrack app for your business needs and requirements*
  Please schedule your convenient time with us for support and guide,  we will arrange accordingly. 
  
OLADIPUPO ILORI. 08074306999, iloriwaliu@gmail.com
*SalesTrack Team Lead.*
*KayBill Technologies*
            ";



            return Message;
        }
        public static string SurveyEmailMessage(string Name)
        {
            string Message = $@"
                    <p> Dear {Name}, </p><br/>

                                <p> We genuinely appreciate your time and insights in answering our  survey  questions. Your input will help KAYBILL TECHNOLOGIES, tailor our services to suit your business needs better.   </p>
               
                    <p>  *SalesTrack app* is a tool needed for your business management; you will get daily/weekly notifications on total sales amount,  sold items,  Out of stock or expired products. Manage your POS, stocks,  taking inventory, expenses, pre orders, customers etc</p>
 
 <p>Sir / Ma, choose any package,create account here https://subscribe.salestrack.app And enjoy promo offer  on *Basic and Premium Plan* Subscribe for one Month and get extra 1 month and 2 months respectively.</p>
  <b>Also there is an offer for you to customize SalesTrack app for your business needs and requirements</b>
 <p> Please schedule your convenient time with us for support and guide,  we will arrange accordingly. </p>
                <p>OLADIPUPO ILORI.  <br/> 08074306999, iloriwaliu@gmail.com </p> <br/>
                <p><b>SalesTrack Team Lead.<b/> </p>
               <p><b>KayBill Technologies.<b/></p>
                ";
            return Message;
        }
        public static string AccountNotActiveMessage (string planName,double DueAmount, string displayType,string businessName)
        { // and  this task is not available until your account is Active. Please complete the subscription setup process and payment.
            if (displayType == "inapp")
            {
                return $"Your {planName} subscription plan is currently inactive, resulting in limited access to resources for your account(s). Please reach out to our support team for assistance.";
                    //"Sorry ! your {planName } subscription plan is not ACTIVE. There are  limited resources for your account(s)." +
                    //$" Contact support team for assistance";
            }
            else if (displayType == "email")
            {//Send details of account, amount to pay and other this to Client Email address
                return $@"";
            }
            else return "";

        }
        public static string SubscriptionExpiredMessage(string planName,DateTime DueDate, DateTime NextPayDate,string displayType)
        {
            if (displayType == "inapp")
            {
                return $"Your {planName} subscription plan is overdue, on {DueDate},  and we recommend contacting your manager to renew it promptly or explore higher subscription options. Thank you.";
                    //"Interrupted !!!, your {planName } subscription plan has overdue it subscription period. Contact manager to renew or choose higher subcription package. Thanks";
            }
            else if (displayType == "email")
            {
                return $@"";
            }
            else return "";
        }
        public  static string GetSubscriptionName(int planId)
        {
            if (planId == 0) return "No Subscription";
            else if (planId == 1) return "Basic";
            else if (planId == 2) return "Premium";
            else if (planId == 3) return "Enterprise";
            else if (planId == 4) return "Customization";
            return "";
        }
        
        public static string MarketerNewCustomerMessage(string MarketerName,string customerEmail,string customerPhone,DateTime regdate)
        {
            var msg = $@"<p>Dear Marketer ({MarketerName}),</p>

<p>We hope this message finds you well. We are excited to inform you that a <b>new customer has successfully registered</b> on the SalesTrack application using your promo code as of {regdate.ToLongTimeString()} , { regdate.ToLongDateString()} </p>. 

<br/> We kindly request your assistance in guiding and supporting the customer to kickstart their journey with SalesTrack.<br/> Encourage them to perform essential tasks such as creating a store, updating user profiles, adding products, managing inventory, utilizing the Point of Sale (POS), and exploring other features.<br/>

<p>Additionally, we appreciate your efforts in following up with the customer to ensure they subscribe and choose one of our plan packages. This will grant them access to all the advanced features of SalesTrack, allowing them to effectively manage their business and receive insightful weekly and monthly reports.</p>
Customer Contact details are  <b>Email : {customerEmail} ; Phone Number:  {customerPhone}</b> <br/>

<br/>Your commitment to customer engagement is highly valued, and we thank you for your continued support.

";

            return msg;
        }
       public static string NewMarketerRegistered(string markterName,string promoCode)
        {
            var msg = $@"<p>Hello {markterName }</p>,

<p>We are delighted to welcome you to KayBill Technologies as a Marketer for our SalesTrack application and other products & services.<br/>
Your unique Promo Code is: <b>{promoCode}</b>. Feel free to utilize this code to register customers, 
or share it with customers for a discount and a special welcome gift when they create an account on our applications</p>.

Thank you for joining our team!

";
            return msg;
        }
    }
    public class StringsDictionary
    {

    }
}
