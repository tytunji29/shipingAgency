using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JetSend.Core.Infranstructure.Common;
using JetSend.Core.Infranstructure.Common.Enums;

namespace JetSend.API.Controllers
{
    [Route("app/v{version:apiVersion}/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiVersion("1.0")]
    public class APIBaseController : ControllerBase
    {
        protected IActionResult ResponseCode<T>(ApiResponse<T> response) where T : class
        {
            var stringWithLowerCaseProperties = string.Empty;
            var encryptResponse = string.Empty;

            switch (response.StatusCode)
            {
                case StatusEnum.Success:
                    response.Status = true;

                    return Ok(response);
                case StatusEnum.Message:
                    response.Status = false;
                    return Ok(response);
                case StatusEnum.Failed:
                    response.Status = false;
                    return StatusCode(408, response);

                case StatusEnum.Validation:

                    return StatusCode(400, response);

                case StatusEnum.SystemError:

                    return StatusCode(500, response);

                case StatusEnum.NoRecordFound:

                    return Ok(response);
                case StatusEnum.ServerError:
                    return StatusCode(500, response);
                case StatusEnum.Unauthorised:
                    return StatusCode(401, response);
                default:

                    return StatusCode(400, encryptResponse);
            }
        }

        protected IActionResult ResponseCode(ApiResponse response)
        {
            var stringWithLowerCaseProperties = string.Empty;

            //string auth = this.Request.Headers["Authorization"].ToString().Split(" ").Last();
            var encryptResponse = string.Empty;
            switch (response.statusCode)
            {
                case StatusEnum.Success:
                    response.status = true;
                    return Ok(response);
                case StatusEnum.Message:
                    response.status = true;
                    return Ok(response);
                case StatusEnum.Failed:

                    return StatusCode(408, response);

                case StatusEnum.Validation:
                    // response.Status = false;
                    return StatusCode(400, response);

                case StatusEnum.SystemError:
                    //response.Status = false;
                    return StatusCode(500, response);

                case StatusEnum.NoRecordFound:

                    return StatusCode(404, response);
                case StatusEnum.ServerError:
                    //response.Status = false;
                    return StatusCode(500, response);
                case StatusEnum.Unauthorised:
                    return StatusCode(401, response);
                default:

                    return StatusCode(400, encryptResponse);
            }
        }
    }
}
