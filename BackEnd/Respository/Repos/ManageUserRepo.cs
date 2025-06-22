using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Entities;
using JetSend.Domain.Entities.Auths;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;
using JetSend.Domain.Dtos.RequestDtos.Account;
using JetSend.Domain.Dtos.ResponseDtos.Account;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Core.Infranstructure.Common.Enums;
using JetSend.Core.Infranstructure.Common;

namespace JetSend.Respository.Repos
{
    public class ManageUserRepo : IManageUserRepo
    {
        private readonly JetSendDbContext _db;
        public ManageUserRepo(JetSendDbContext db)
        {
            _db = db;
        }

        public async Task AddUser(Management entity)
        {
            await _db.Managements.AddAsync(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<Management?> GetUser(string UserName)
        {
            return await _db.Managements.Where(c => c.UserName == UserName || c.PhoneNumber == UserName || c.Email == UserName).FirstOrDefaultAsync();
        }

        public async Task<ApplicationUsers?> GetAuthUserByEmail(string email)
        {
            return await _db.ApplicationUsers.FirstOrDefaultAsync(c => c.Email == email);
        }
        public async Task<Customer?> GetCustomerByEmail(string email)
        {
            return await _db.Customers.FirstOrDefaultAsync(c => c.Email == email);
        }

        public async Task<ApplicationUsers?> GetAuthUserByPhone(string phoneNumber)
        {
            return await _db.ApplicationUsers.FirstOrDefaultAsync(c => c.PhoneNumber == phoneNumber);
        }

        public async Task<IEnumerable<ApplicationUsers>> GetAuthUsers()
        {
            return await _db.ApplicationUsers.ToListAsync();
        }

        public async Task<IEnumerable<OtpVerificationLog>> GetOtpVerificationLogs()
        {
            return await _db.OtpVerificationLogs.ToListAsync();
        }

        public async Task UpdateOTP(SendOtpRequest request)
        {
            var otp = await _db.OtpVerificationLogs.Where(x => x.UserId == request.UserId && x.Purpose == request.Purpose && x.Status == OtpCodeStatusEnum.Sent).FirstOrDefaultAsync();
            if (otp is not null)
            {
                otp.Code = request.Code;
                otp.TimeUpdated = DateTime.UtcNow;
                otp.Status = OtpCodeStatusEnum.Sent;
                _db.OtpVerificationLogs.Update(otp);
                await _db.SaveChangesAsync();
            }
            else
            {
                OtpVerificationLog verificationLog = new()
                {
                    UserId = request.UserId,
                    Recipient = request.UserEmail!,
                    Purpose = request.Purpose,
                    Code = request.Code,
                    Status = OtpCodeStatusEnum.Sent,
                    TimeCreated = DateTime.UtcNow,
                    TimeUpdated = DateTime.UtcNow,
                };
                _db.OtpVerificationLogs.Add(verificationLog);
                await _db.SaveChangesAsync();
            }
        }

        public async Task AddOTP(OtpVerificationLog entity)
        {
            _db.OtpVerificationLogs.Add(entity);
            await _db.SaveChangesAsync();
        }

        public async Task AddCustomer(Customer entity)
        {
            _db.Customers.Add(entity);
            await _db.SaveChangesAsync();
        }
        public async Task<long> AddAgent(Agent entity)
        {
            _db.Agents.Add(entity);
            await _db.SaveChangesAsync();
            return entity.Id;
        }

        public async Task UpdateCustomer(Customer entity)
        {
            _db.Customers.Update(entity);
            await _db.SaveChangesAsync();
        }

        public async Task AddAgentBankDetail(AgentBankDetail entity)
        {
            _db.AgentBankDetails.Add(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<Customer?> GetCustomer(string email, string userId)
        {
            return await _db.Customers.FirstOrDefaultAsync(c => c.Email == email || c.UserId == userId);
        }

        public async Task<Customer?> GetCustomer(string email)
        {
            return await _db.Customers.FirstOrDefaultAsync(c => c.Email == email);
        }
        public async Task<Agent?> GetAgent(string email)
        {
            return await _db.Agents.FirstOrDefaultAsync(c => c.Email == email);
        }

        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _db.Customers.ToListAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<OtpVerificationLog?> GetOtpVerificationLog(string code)
        {
            return await _db.OtpVerificationLogs.FirstOrDefaultAsync(c => c.Code == code);
        }

        public async Task<CustomerProfileResponse?> GetProfile(string email)
        {
            int isAdmin = 1;
            var customerUser = await _db.Customers.FirstOrDefaultAsync(us => us.Email == email);
            if (customerUser is null)
            {
                return null;
            }


            var response = new CustomerProfileResponse
            {
                UserId = customerUser.UserId,
                Email = email,
                FirstName = customerUser.FirstName,
                PhoneNumber = customerUser.PhoneNumber,
                LastName = customerUser.LastName,
                Gender = customerUser.Gender,
                Photo = customerUser.Photo,
                Address = customerUser.Address,
                DateOfBirth = customerUser.DateOfBirth,
                IsCompany = "No",
            };

            return response;
        }

        public async Task<ApiResponse> ValidateOTPCodeAsync(ValidateOtpRequest otpRequest, int otpExpiry)
        {
            var date = DateTime.UtcNow;
            var otpVerification = await _db.OtpVerificationLogs.FirstOrDefaultAsync(v => v.UserId == otpRequest.UserId && v.Status == OtpCodeStatusEnum.Sent && v.Purpose == otpRequest.Purpose && v.Code == otpRequest.Code);

            if (otpVerification == null)
            {
                return new ApiResponse("Verification code provided is invalid.", StatusEnum.Validation, false);
            }

            if (date > otpVerification.TimeCreated.AddMinutes(otpExpiry))
            {
                otpVerification.Status = OtpCodeStatusEnum.Expired;
                otpVerification.TimeUpdated = DateTime.UtcNow;
                await _db.SaveChangesAsync();
                return new ApiResponse("Code provided has expired.", StatusEnum.Validation, false);
            }

            otpVerification.ConfirmedOn = DateTime.UtcNow;
            otpVerification.Status = OtpCodeStatusEnum.Verified;
            otpVerification.TimeUpdated = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return new ApiResponse("Code verify successfully.", StatusEnum.Success, true);
        }

        public async Task RemoveAdminUser(Management entity)
        {
            _db.Managements.Remove(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<List<ManagementDto>> Managements()
        {
            var getm = await (from m in _db.Managements
                              join rl in _db.Roles on m.RoleId equals rl.Id
                              select new ManagementDto
                              {
                                  RoleName = rl.Name,
                                  Email = "***" + m.Email.Substring(4),
                                  PhoneNumber = m.PhoneNumber,
                                  UserName = m.UserName,

                              }).ToListAsync();
            return getm;
        }

        public async Task UpdateUser(Management entity)
        {
            _db.Managements.Update(entity);
            await _db.SaveChangesAsync();
        }
    }
}
