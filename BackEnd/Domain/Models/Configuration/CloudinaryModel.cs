using System;
using System.Collections.Generic;
using System.Text;

namespace MeetTech.Core.Infranstructure.Model.Configuration
{
    public class CloudinaryModel
    {
        public string CloudinaryApiKey { get; set; }
        public string CloudinarySecreteKey { get; set; }
        public string CloudinaryUsername { get; set; }
    }
    public class FileUploadDto
    {
        public string FileUrl { get; set; }
        public string FileName { get; set; }
    }
}
