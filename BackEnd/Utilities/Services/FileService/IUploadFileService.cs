using MeetTech.Core.Infranstructure.Model.Configuration;
using Microsoft.AspNetCore.Http;

namespace MeetTech.Core.Utilities.Services.FileService
{
    public interface IUploadFileService
    {
        Task<string> UploadImageAsync(IFormFile file, string folder);
        Task<FileUploadDto> UploadCloudinaryFile(string FileContent);
        //Task<FileUploadDto> UploadCloudinaryFileAsync(string FileContent, CancellationToken cancellationToken);
       // Task<object> DeleteFile(string FilePath);
    }
}
