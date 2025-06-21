﻿using MeetTech.Core.Utilities.Statics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace UtilitiesServices.Statics
{
    public class CustomizeCodes
    {
        public static string GetCode()
        {
            var code = Guid.NewGuid().ToString().Substring(0, 25);
            return "SHIP" + code;
        }
        public static string ReferenceCode()
        {
            var Code = "";
            Code = Guid.NewGuid().ToString();
            Code = Regex.Replace(Code, "[^0-9]", "");
            Code = Code.Substring(0, 11);

            return Code;
        }

        public static string GetUniqueId()
        {
            var Code = "";
            Code = Guid.NewGuid().ToString();
            Code = Regex.Replace(Code, "[^0-9]", "");
            Code = Code.Substring(0, 7);
            return Code;
        }
        public static string GetUniqueString(int length) => Guid.NewGuid().ToString("N")[..length];
        public static string GenerateOTP(int lenght)
        {
            var Code = "";
            Code = Guid.NewGuid().ToString();
            Code = Regex.Replace(Code, "[^0-9]", "");
            return Code.Substring(0, lenght);
        }

        public static string GenerateRandomCode(int length)
        {
            Random random = new();
            char[] letters = new char[length];

            for (int i = 0; i < length; i++)
            {
                // ASCII value of 'A' is 65 and 'Z' is 90
                letters[i] = (char)random.Next(65, 91); // Random character between 'A' (65) and 'Z' (90)
            }

            return new string(letters);
        }

        public static string GeneratePassword()
        {
            string upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
            string digitChars = "0123456789";
            string punctuationChars = "!@#$%^&*()-_+=<>?;";

            var passwordBuilder = new StringBuilder();
            var random = new Random();

            // Add at least one character from each category
            passwordBuilder.Append(upperCaseChars[random.Next(upperCaseChars.Length)]);
            passwordBuilder.Append(lowerCaseChars[random.Next(lowerCaseChars.Length)]);
            passwordBuilder.Append(digitChars[random.Next(digitChars.Length)]);
            passwordBuilder.Append(punctuationChars[random.Next(punctuationChars.Length)]);

            // Fill the rest of the password with random characters
            string allChars = upperCaseChars + lowerCaseChars + digitChars + punctuationChars;
            for (int i = 4; i < 8; i++)
                passwordBuilder.Append(allChars[random.Next(allChars.Length)]);

            return passwordBuilder.ToString();
        }
        public static string GetPaymentReference(int length, string Prefix)
        {
            var numbers = Guid.NewGuid().ToString();
            numbers = Regex.Replace(numbers, "[^0-9]", "");
            numbers = numbers[..length];
            var yearvalue = DateTime.Now.Year;
            return Prefix + yearvalue + numbers;
        }

        public static string GetPeriodDifference(DateTime? date1, DateTime? date2)
        {
            if (date1 == null || date2 == null)
            {
                return "";
            }
            var period = date2 - date1;
            var days = period.Value.TotalDays;
            string response = "";
            var remainingDays = days;
            if (remainingDays > 365)
            {
                response = ((int)Math.Round(remainingDays / 366)).ToString() + " year(s) ago";
                remainingDays = remainingDays % 366;
            }
            if (remainingDays > 30)
            {
                response = response + ((int)Math.Round(remainingDays / 30)).ToString() + " month(s) ago";
                remainingDays = remainingDays % 30;
            }
            if (remainingDays >= 1)
            {
                response = response + ((int)remainingDays).ToString() + " day(s) ago";
            }
            else
            {
                if (response == "")
                {
                    var hours = period.Value.TotalHours;
                    if (hours >= 1)
                    {
                        response = response + ((int)hours).ToString() + " hour(s) ago";
                    }
                    else
                    {
                        var minutes = period.Value.TotalMinutes;
                        response = response + ((int)minutes).ToString() + " minute(s) ago";
                    }
                }
            }

            return response;
        }

        public static string GetDeliveryDuration(DateTime? date1, DateTime? date2)
        {
            if (date1 == null || date2 == null)
            {
                return "";
            }
            var period = date1 - date2;
            var days = period.Value.TotalDays;
            string response = "";
            if (days < 0)
            {
                return "Expired";
            }
            var remainingDays = days;
            if (remainingDays > 365)
            {
                response = ((int)Math.Round(remainingDays / 366)).ToString() + " year(s)";
                remainingDays = remainingDays % 366;
            }
            if (remainingDays > 30)
            {
                response = response + ((int)Math.Round(remainingDays / 30)).ToString() + " month(s)";
                remainingDays = remainingDays % 30;
            }
            if (remainingDays >= 1)
            {
                response = response + ((int)remainingDays).ToString() + " day(s)";
            }
            else
            {
                if (response == "")
                {
                    var hours = period.Value.TotalHours;
                    if (hours >= 1)
                    {
                        response = response + ((int)hours).ToString() + " hour(s)";
                    }
                    else
                    {
                        var minutes = period.Value.TotalMinutes;
                        response = response + ((int)minutes).ToString() + " minute(s)";
                    }
                }
            }

            return response;
        }

        //public static string GetDescription(OrderStatus status, string orderCode)
        //{
        //    string description = status switch
        //    {
        //        OrderStatus.Order => GenericStrings.ORDERDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        OrderStatus.Accepted => GenericStrings.ACCEPTDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        OrderStatus.Active => GenericStrings.ACTIVEDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        OrderStatus.Confirmed => GenericStrings.CONFIRMDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        OrderStatus.Rejected => GenericStrings.REJECTDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        OrderStatus.PickedUp => GenericStrings.PICKUPDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        OrderStatus.Delivered => GenericStrings.DELIVEREDDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        OrderStatus.Processing => GenericStrings.PROCESSINGDESCRIPTION.Replace("[[CODE]]", orderCode),
        //        _ => ""
        //    };
        //    return description;
        //}
    }
}
