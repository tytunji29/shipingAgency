
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MeetTech.Core.Infranstructure.Model.Configuration;

namespace MeetTech.Core.Utilities.Services.FileService
{
    public static class FileUpload_Cloudinary
    {
        public static async Task<ImageUploadResult> CloudinaryImageUploadAsync(string imagePath, CloudinaryModel cloudinaryModel)
        {
            Account account = new Account
                (
                  cloudinaryModel.CloudinaryUsername,
                  cloudinaryModel.CloudinaryApiKey,
                  cloudinaryModel.CloudinarySecreteKey
                  );

            Cloudinary cloudinary = new Cloudinary(account);

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(@imagePath),

            };

            var uploadResult = cloudinary.Upload(uploadParams);

            return uploadResult;

        }

    }
}
