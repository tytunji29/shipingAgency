using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using MeetTech.Infranstructure.Model.Configuration;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using Vubids.Domain.Interfaces.IServices;
using System.IdentityModel.Tokens.Jwt;
using MeetTech.Core.Utilities.Statics;
using Vubids.Domain.Dtos.RequestDtos.Account;
using Vubids.Domain.Exceptions;
using System.Security.Principal;

namespace Vubids.Core.Utilities.Services.TokenService
{
    public class GenerateTokenService : IGenerateTokenService
    {
        private readonly AppSettings _appSettings;
        private readonly SymmetricSecurityKey _key;

        public GenerateTokenService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JwtKey));
        }

        public Task<string> CreateUserToken(string UserName, string AuthId, string roleName)
        {
            ClaimsIdentity identity = new ClaimsIdentity(
             new[] { new Claim("usn", UserName),
                new Claim("AuthzId", AuthId),
                new Claim("roleName", roleName),
            });
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,

                Expires = GetLocalDateTime.CurrentDateTime().AddDays(_appSettings.JwtExpiry),
                SigningCredentials = creds,
                IssuedAt = GetLocalDateTime.CurrentDateTime(),

            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Task.FromResult(tokenHandler.WriteToken(token));
        }

        public Task<string> CreateUserTokenAsync(dynamic param)
        {
            throw new NotImplementedException();
        }

        public async Task<TokenParams> GetUserTokenParams(string authToken)
        {
            var res = new TokenParams();
            var ClaimsPrincipal = ValidateToken_GetTokenParam(authToken).Result;
            if (ClaimsPrincipal == null) throw new Exception("Invalid auth credentials");

            //get Claims from token
            res.RoleName =
               ClaimsPrincipal?.FindFirst("roleName")?.Value;

            res.Email =
            ClaimsPrincipal?.FindFirst("email")?.Value;

            res.AuthId =
               ClaimsPrincipal?.FindFirst("AuthzId")?.Value;
            res.UserName =
               ClaimsPrincipal?.FindFirst("usn")?.Value;

            return res;
        }

        public Task<bool> IsTokenValid(string authToken)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = _key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                };

                SecurityToken validatedToken;
                IPrincipal principal = tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
                return Task.FromResult(true);

            }
            catch (Exception ex)
            {
                return Task.FromResult(false);
            }
        }

        public async Task<ClaimsPrincipal> ValidateToken_GetTokenParam(string jwtToken)
        {
            IdentityModelEventSource.ShowPII = true;

            SecurityToken validatedToken;
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
            };
            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);


            return principal;
        }
    }
}
