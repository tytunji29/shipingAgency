namespace Vubids.Core.Infranstructure.Common.Enums
{
    public enum StatusEnum
    {/// <summary>
     /// Succesful 
     /// </summary>
        Success = 200,
        Failed = 201,
        //No record fund for the search
        NoRecordFound = 404,
        /// <summary>
        /// Invalid parameters
        /// </summary>
        Validation = 203,
        Message = 205, //General Messages; Generic
        /// <summary>
        /// Error Messages
        /// </summary>
        ServerError = 99,
        SystemError = 999,
        Unauthorised = 90
    }
    public enum PaymentStatus
    {
        Initiated,
        Verified,
        Success,
        Failed

    }
    public enum PaymentType
    {
        CourseSubscription = 1,
        FundWallet,
        Bill,


    }
    public enum TransactionType
    {
        Credit = 1,
        Debit
    }
    public enum TransactionAggregator
    {
        PayStack,
        FlutterWave,
        Wallet
    }
    public enum PolicyType
    {
        Store = 1,
        Refund
    }

    public enum NotificationType
    {
        NewOrder = 1,
        OrderSent,
        OrderPicked,
        OrderDelivered,
        ReceivedPayment,
        Withdraw,
    }

    public enum OrderType
    {
        Retail = 1,
        Wholesale
    }

    public enum OtpCodeStatusEnum
    {
        Sent = 1,
        Verified,
        Expired,
        Invalidated
    }

    public enum OtpVerificationPurposeEnum
    {
        EmailVerification,
        ForgetPassword
    }

    public enum EntityStatusEnum
    {
        Active = 1,
        InActive,
        Delete
    }
}