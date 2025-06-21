using MeetTech.Core.Infranstructure.Model.Configuration;

namespace MeetTech.Core.Utilities.Services.FileService
{
    public interface IUploadFileService
    {
        Task<FileUploadDto> UploadCloudinaryFile(string FileContent);
        //Task<FileUploadDto> UploadCloudinaryFileAsync(string FileContent, CancellationToken cancellationToken);
       // Task<object> DeleteFile(string FilePath);
    }
}
