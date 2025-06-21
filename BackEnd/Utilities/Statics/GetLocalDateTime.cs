using System;
using System.Collections.Generic;
using System.Text;

namespace MeetTech.Core.Utilities.Statics
{
    public class GetLocalDateTime
    {
        public static DateTime CurrentDateTime()
        {
            DateTime dt = DateTime.Now;
            TimeZoneInfo NaijaZone = TimeZoneInfo.FindSystemTimeZoneById("W. Central Africa Standard Time");


            DateTime Rdt = TimeZoneInfo.ConvertTime(dt, NaijaZone);
            return Rdt;
        }
        public static string CurrentDate()
        {
            DateTime dt = DateTime.Now;
            TimeZoneInfo NaijaZone = TimeZoneInfo.FindSystemTimeZoneById("W. Central Africa Standard Time");

            DateTime Rdt = TimeZoneInfo.ConvertTime(dt, NaijaZone);
            //DateOnly dateOnly = new DateOnly();
            //dateOnly = (DateOnly)Rdt.Day

            return Rdt.ToLongDateString();
        }
        public static string CurrentTime()
        {
            DateTime dt = DateTime.Now;
            TimeZoneInfo NaijaZone = TimeZoneInfo.FindSystemTimeZoneById("W. Central Africa Standard Time");
            DateTime Rdt = TimeZoneInfo.ConvertTime(dt, NaijaZone);
            return Rdt.ToLongTimeString();
        }

    }
}
