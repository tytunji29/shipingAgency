
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.RegularExpressions;

namespace MeetTech.Core.Utilities.Extensions
{
    public static class StringExtensions
    {
        public static string Encrypt(this string textToEncrypt)
        {
            return "";// CryptionManagerMD5.Encrypt(textToEncrypt);
        }

        public static string Decrypt(this string textToDecrypt)
        {
            return "";// CryptionManagerMD5.Decrypt(textToDecrypt);
        }
        //add extension to encripy with provided or custom Key
        public static string Encrypt_E(this string textToEncrypt, string Ekey)
        {
            return "";// CryptionManagerMD5.Encrypt(textToEncrypt, Ekey);
        }

        public static string Decrypt_E(this string textToDecrypt, string Ekey)
        {
            return "";// CryptionManagerMD5.Decrypt(textToDecrypt, Ekey);
        }
        public static string EncryptSHA512(this string textToEncrypt)
        {

            return "";// CryptionManagerSHA512.EncrpyptSHA512String(textToEncrypt);
        }
        public static string EncryptSHA512ToBase64(this string textToEncrypt)
        {

            return  "";// CryptionManagerSHA512.EncrpyptSHA512ToBase4(textToEncrypt);
        }

        public static bool IsValidEmail(this string email)
        {
            var e = new EmailAddressAttribute();
            return (!string.IsNullOrEmpty(email) && e.IsValid(email));
        }
        public static bool IsValidPhoneNumber(this string phoneNumber)
        {
            bool isPhoneNo = false;
            if(string.IsNullOrEmpty(phoneNumber)) { return false; }
            if(phoneNumber.Length <11 ) { return false; }
            isPhoneNo = Regex.Match(phoneNumber, @"^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$").Success;

            return isPhoneNo;
        }

        public static bool IsValidNumber(this string text)
        {
            bool isNumber = Regex.IsMatch(text, @"^([0-9]\d*|0)$");
            // @"^[1-9]\d{0,2}(\.\d{3})*(,\d+)?$", RegexOptions.IgnoreCase);
            return isNumber;
        }
    }
}
