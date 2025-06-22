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
using JetSend.Core.Utilities.Services.TokenService;
using JetSend.Domain.Entities.Auths;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Domain.Interfaces.IServices;
using JetSend.Respository;
using JetSend.Respository.DataContext;
using JetSend.Respository.Repos;
using JetSendsServices;
using CloudinaryDotNet;

namespace JetSend.API.Extensions
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
            // 🔌 Configure Entity Framework + SQL Server
            services.AddDbContext<JetSendDbContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("JetSendcon")!);
            });

            // 🔐 Configure Identity with custom ApplicationUsers and ApplicationUsersRole
            services.AddIdentity<ApplicationUsers, ApplicationUsersRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
            })
            .AddEntityFrameworkStores<JetSendDbContext>()
            .AddDefaultTokenProviders();

            // ⚙️ Bind app settings
            services.Configure<AppSettings>(configuration.GetSection("appSettings"));
            services.Configure<PaymentConfig>(configuration.GetSection("PaymentConfig"));

            var appSettings = configuration.Get<AppSettings>();
            var sendGridKey = configuration["appSettings:SendGridKey"];
            var CloudinaryUsername = configuration["appSettings:CloudinaryUsername"];
            var CloudinaryApiKey = configuration["appSettings:CloudinaryApiKey"];
            var CloudinarySecreteKey = configuration["appSettings:CloudinarySecreteKey"];
            services.AddSendGrid(options => options.ApiKey = sendGridKey);
          
            var account = new Account(
                CloudinaryUsername,
                CloudinaryApiKey,
                CloudinarySecreteKey
            );

            var cloudinary = new CloudinaryDotNet.Cloudinary(account)
            {
                Api = { Secure = true }
            };

            services.AddSingleton(cloudinary);
            // 🔒 Configure JWT Authentication
            services.AddAuthentication(x =>
            {
                x.DefaultScheme = IdentityConstants.ApplicationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(configuration["appSettings:JwtKey"] ?? string.Empty)
                    ),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                x.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception is SecurityTokenExpiredException)
                        {
                            context.Response.Headers.Append("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });
        }

        //static void AddIdentityService(this IServiceCollection services, IConfiguration configuration)
        //{
        //    services.AddDbContext<JetSendDbContext>(opt =>
        //    {
        //        opt.UseSqlServer(configuration.GetConnectionString("JetSendcon")!);

        //    });
        //    services.AddIdentity<ApplicationUsers, IdentityRole>(options =>
        //    {
        //        options.Password.RequireDigit = false;
        //        options.Password.RequiredLength = 6;
        //        options.Password.RequireNonAlphanumeric = false;
        //        options.Password.RequireUppercase = false;
        //        options.Password.RequireLowercase = false;
        //        options.SignIn.RequireConfirmedEmail = false;
        //        options.SignIn.RequireConfirmedPhoneNumber = false;
        //    })
        //    .AddDefaultTokenProviders()
        //    .AddEntityFrameworkStores<JetSendDbContext>();
        //    // services.RegisterSwagger();
        //    services.Configure<AppSettings>(configuration.GetSection("appSettings"));
        //    services.Configure<PaymentConfig>(configuration.GetSection("PaymentConfig"));
        //    var appSettings = configuration.Get<AppSettings>();
        //    var jt = configuration.GetSection("appSettings")["SendGridKey"].ToString();
        //    services.AddSendGrid(options => options.ApiKey = jt);


        //    services.AddAuthentication(x =>
        //    {
        //        x.DefaultScheme = IdentityConstants.ApplicationScheme;
        //        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //    })
        //    .AddJwtBearer(x =>
        //    {
        //        x.RequireHttpsMetadata = false;
        //        x.SaveToken = true;
        //        x.TokenValidationParameters = new TokenValidationParameters
        //        {
        //            ValidateIssuerSigningKey = true,
        //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("appSettings")["JwtKey"])),
        //            ValidateIssuer = false,
        //            ValidateAudience = false
        //        };
        //        x.Events = new JwtBearerEvents
        //        {
        //            OnAuthenticationFailed = context =>
        //            {
        //                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
        //                {
        //                    context.Response.Headers.Append("Token-Expired", "true");
        //                }
        //                return Task.CompletedTask;
        //            }
        //        };
        //    });
        //}

        public static IServiceCollection RegisterSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "JetSendsAPI",
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
            services.AddScoped<IManageGeneralSetUpRepo, ManageGeneralSetUpRepo>();
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
            services.AddScoped<IManageGeneralSetUpService, ManageGeneralSetUpService>();
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
