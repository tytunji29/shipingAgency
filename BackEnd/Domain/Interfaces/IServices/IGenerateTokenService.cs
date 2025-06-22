using System.Security.Claims;
using JetSend.Domain.Dtos.RequestDtos.Account;

namespace JetSend.Domain.Interfaces.IServices
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
