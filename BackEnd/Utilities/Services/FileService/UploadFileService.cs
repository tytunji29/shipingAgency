using MeetTech.Core.Infranstructure.Model.Configuration;
using MeetTech.Infranstructure.Model.Configuration;
using Microsoft.Extensions.Options;
using UtilitiesServices.Statics;
using JetSend.Domain.Exceptions;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;

namespace MeetTech.Core.Utilities.Services.FileService
{
    public class UploadFileService : IUploadFileService
    {
        private readonly AppSettings _appSettings;
        private readonly Cloudinary _cloudinary;

        public UploadFileService(IOptions<AppSettings> appSettings, Cloudinary cloudinary)
        {
            _appSettings = appSettings.Value;
            _cloudinary = cloudinary;
        }
        public async Task<string> UploadImageAsync(IFormFile file, string folder)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Invalid file");

            await using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = folder, // Optional: your folder name on Cloudinary
                UseFilename = true,
                UniqueFilename = true,
                Overwrite = false
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return uploadResult.SecureUrl.ToString(); // ✅ Return secure URL
            }

            throw new Exception($"Cloudinary upload failed: {uploadResult.Error?.Message}");
        }

        public async Task<FileUploadDto> UploadCloudinaryFile(string FileContent)
        {
            var res = new FileUploadDto();
            try
            {
                ApiLogs.Info("Upload File Initiated");

                string userName = ConvertersHelper.ConvertByteToString(ConvertersHelper.ConvertStringToByte(_appSettings.CloudinaryUsername));
                string cloudunaryApikey = ConvertersHelper.ConvertByteToString(ConvertersHelper.ConvertStringToByte(_appSettings.CloudinaryApiKey));
                string CloudinarySecreteKey = ConvertersHelper.ConvertByteToString(ConvertersHelper.ConvertStringToByte(_appSettings.CloudinarySecreteKey));
                CloudinaryModel cloudinaryModel = new CloudinaryModel
                {
                    CloudinaryUsername = userName,
                    CloudinaryApiKey = cloudunaryApikey,
                    CloudinarySecreteKey = CloudinarySecreteKey
                };
                if (!string.IsNullOrEmpty(FileContent))
                {

                    var Result = await FileUpload_Cloudinary.CloudinaryImageUploadAsync(FileContent, cloudinaryModel);
                    if (Result.SecureUri != null)
                    {
                        res.FileUrl = Result.SecureUri.ToString();
                        res.FileName = Result.OriginalFilename;
                    }
                    else
                    {
                        ApiLogs.Info($"Something went wrong at UploadCloudinaryFileAsync: date: {DateTime.Now.Date.ToString("dddd, dd MMM, yyyy")}");
                        res.FileUrl = "NotV";
                        res.FileName = "NotV";
                        throw new ApiGenericException("Something went wrong. File uploading failed");

                    }

                }
            }
            catch (Exception ex)
            {


                ApiLogs.Error($"Error at UploadCloudinaryFileAsync: date: {DateTime.Now.Date.ToString("dddd, dd MMM, yyyy")} : {ex.Message}", ex);
                //  throw new ApiGenericException("An error occured, uploading file  failed");
                res.FileUrl = "NotV";//"NotV-E:" + ex.Message;
                res.FileName = "NotV";

            }
            return res;

        }

    }
}
