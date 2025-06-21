using MeetTech.Core.Infranstructure.Model.Configuration;
using MeetTech.Infranstructure.Model.Configuration;
using Microsoft.Extensions.Options;
using UtilitiesServices.Statics;
using Vubids.Domain.Exceptions;

namespace MeetTech.Core.Utilities.Services.FileService
{
    public class UploadFileService : IUploadFileService
    {
        private readonly AppSettings _appSettings;

        public UploadFileService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;

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

        //public async Task<FileUploadDto> UploadCloudinaryFileAsync(string FileContent, CancellationToken cancellationToken)
        //{
        //    var res = new FileUploadDto();
        //    try
        //    {
        //        ApiLogs.Info("Upload File Initiated");

        //        string userName = ConvertersHelper.ConvertByteToString(ConvertersHelper.ConvertStringToByte(_appSettings.CloudinaryUsername));
        //        string cloudunaryApikey = ConvertersHelper.ConvertByteToString(ConvertersHelper.ConvertStringToByte(_appSettings.CloudinaryApiKey));
        //        string CloudinarySecreteKey = ConvertersHelper.ConvertByteToString(ConvertersHelper.ConvertStringToByte(_appSettings.CloudinarySecreteKey));
        //        CloudinaryModel cloudinaryModel = new CloudinaryModel
        //        {
        //            CloudinaryUsername = userName,
        //            CloudinaryApiKey = cloudunaryApikey,
        //            CloudinarySecreteKey = CloudinarySecreteKey
        //        };
        //        if (!string.IsNullOrEmpty(FileContent))
        //        {

        //            var Result = await FileUpload_Cloudinary.CloudinaryImageUploadAsync(FileContent, cloudinaryModel);
        //            if (Result.SecureUri != null)
        //            {
        //                res.FileUrl = Result.SecureUri.ToString();
        //                res.FileName = Result.OriginalFilename;
        //            }
        //            else
        //            {
        //                ApiLogs.Info($"Something went wrong at UploadCloudinaryFileAsync: date: {DateTime.Now.Date.ToString("dddd, dd MMM, yyyy")}");
        //                throw new ApiGenericException("Something went wrong,uploading file  failed");

        //            }

        //        }
        //    }
        //    catch (Exception ex)
        //    {


        //        ApiLogs.Error($"Error at UploadCloudinaryFileAsync: date: {DateTime.Now.Date.ToString("dddd, dd MMM, yyyy")} : {ex.Message}", ex);
        //        throw new ApiGenericException("An error occured, uploading file  failed");


        //    }
        //    return res;

        //}

    }
}
