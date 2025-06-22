using Serilog;

namespace JetSend.Domain.Exceptions
{
    public class ApiLogs
    {
        public static void Error(string msg)
        {
            Log.Error(msg);
        }

        public static void Error(string msg, Exception ex)
        { //U can send Email Here to LogErrors if we choose to send mail; Later Update
            Log.Error(ex, msg);
        }

        public static void Info(string msg)
        {
            Log.Information(msg);
        }
        public static void Warning(string msg)
        {
            Log.Warning(msg);
        }
    }

}
