using System.Security.Claims;
using Vubids.Domain.Dtos.RequestDtos.Account;

namespace Vubids.Domain.Interfaces.IServices
{
    public interface IGenerateTokenService
    {
        Task<string> CreateUserToken(string UserName, string AuthId, string roleName); //expired 24hours
        Task<string> CreateUserTokenAsync(dynamic param);
        Task<bool> IsTokenValid(string authToken); //Check if the token is valid
        Task<TokenParams> GetUserTokenParams(string authToken);
        Task<ClaimsPrincipal> ValidateToken_GetTokenParam(string jwtToken);
    }
}
