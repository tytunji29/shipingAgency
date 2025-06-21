using MeetTech.Core.Utilities.Services.FileService;
using MeetTech.Core.Utilities.Services.Messages;
using MeetTech.Infranstructure.Model.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SendGrid.Extensions.DependencyInjection;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Vubids.Core.Utilities.Services.TokenService;
using Vubids.Domain.Entities.Auths;
using Vubids.Domain.Interfaces.IRepositories;
using Vubids.Domain.Interfaces.IServices;
using VubidsRespository;
using VubidsRespository.DataContext;
using VubidsRespository.Repos;
using VubidsServices;

namespace VubUsersAPI.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration config)
        {
            RepoServices(services, config);
            services.AddIdentityService(config);
            return services;
        }

        static void AddIdentityService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<VubidDbContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("vubidcon")!);

            });
            services.AddIdentity<ApplicationUsers, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
            })
            .AddDefaultTokenProviders()
            .AddEntityFrameworkStores<VubidDbContext>();
            // services.RegisterSwagger();
            services.Configure<AppSettings>(configuration.GetSection("appSettings"));
            services.Configure<PaymentConfig>(configuration.GetSection("PaymentConfig"));
            var appSettings = configuration.Get<AppSettings>();
            var jt = configuration.GetSection("appSettings")["SendGridKey"].ToString();
            services.AddSendGrid(options => options.ApiKey = jt);


            services.AddAuthentication(x =>
            {
                x.DefaultScheme = IdentityConstants.ApplicationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("appSettings")["JwtKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                x.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Append("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });
        }

        public static IServiceCollection RegisterSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "VubidsAPI",
                    Version = "1.0"
                });

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid bearer token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = JwtBearerDefaults.AuthenticationScheme
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        In = ParameterLocation.Header
                    },
                    Array.Empty<string>()
                }});

                var xmlFile = $"{Assembly.GetEntryAssembly()?.GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);
            });
            return services;
        }

        static void RepoServices(this IServiceCollection services, IConfiguration config)
        {
            //Repo

            services.AddScoped<IManageChatMessageRepo, ManageChatMessageRepo>();
            services.AddScoped<IManageCompanyRepo, ManageCompanyRepo>();
            services.AddScoped<IManageDeliveryPickupRepo, ManageDeliveryPickupRepo>();
            services.AddScoped<IManageItemsRepo, ManageItemsRepo>();
            services.AddScoped<IManagePackageRepo, ManagePackageRepo>();
            services.AddScoped<IManagePaymentRepo, ManagePaymentRepo>();
            services.AddScoped<IManageQuoteRepo, ManageQuoteRepo>();
            services.AddScoped<IManageShipmentRepo, ManageShipmentRepo>();
            services.AddScoped<IManageSupportRepo, ManageSupportRepo>();
            services.AddScoped<IManageTransporterRepo, ManageTransporterRepo>();
            services.AddScoped<IManageUserRepo, ManageUserRepo>();
            services.AddScoped<IManageVehicleRepo, ManageVehicleRepo>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            //Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IGenerateTokenService, GenerateTokenService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IPackageService, PackageService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IQuoteService, QuoteService>();
            services.AddScoped<IShipmentService, ShipmentService>();
            services.AddScoped<ISupportService, SupportService>();
            services.AddScoped<ITransporterService, TransporterService>();
            services.AddScoped<IVehicleTypeService, VehicleTypeService>();


            //Utilities
            services.AddScoped<IUploadFileService, UploadFileService>();
            services.AddScoped<IEmailService, EmailService>();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }
    }
}

public static class IdentityUtil
{
    public static string GetUserId(this IIdentity identity) => GetClaimValue(identity, "AuthzId");
    public static string GetUserEmail(this IIdentity identity) => GetClaimValue(identity, "usn");
    private static string GetClaimValue(IIdentity identity, string claimType)
    {
        var claimIdentity = (ClaimsIdentity)identity;
        return claimIdentity.Claims.GetClaimValue(claimType);
    }
    private static string GetClaimValue(this IEnumerable<Claim> claims, string claimType)
    {
        var claimsList = new List<Claim>(claims);
        var claim = claimsList.Find(c => c.Type == claimType);
        return claim?.Value ?? "";
    }
}
