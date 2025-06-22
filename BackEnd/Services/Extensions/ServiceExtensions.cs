using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Respository.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using JetSend.Domain.Entities.Auths;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using JetSend.Respository;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.Repos;
using MeetTech.Infranstructure.Model.Configuration;
using System.Security.Claims;
using System.Security.Principal;

namespace JetSendsServices.Extensions
{
    //public static class ServiceExtensions
    //{
    //    public static IServiceCollection Add_Services(this IServiceCollection services, IConfiguration config)
    //    {
    //        RepoServices(services, config);
    //        AddIdentityService(services, config);
    //        return services;
    //    }
    //    static void AddIdentityService(this IServiceCollection services, IConfiguration configuration)
    //    {
    //        var appSettings = configuration.Get<AppSettings>();

    //        services.Configure<AppSettings>(configuration.GetSection("AppSettings"));
    //        services.AddDbContext<JetSendDbContext>(opt =>
    //        {
    //            opt.UseSqlServer(configuration.GetConnectionString("JetSendcon"));

    //        });
    //        services.AddIdentity<ApplicationUsers, IdentityRole>(options =>
    //        {
    //            options.Password.RequireDigit = false;
    //            options.Password.RequiredLength = 6;
    //            options.Password.RequireNonAlphanumeric = false;
    //            options.Password.RequireUppercase = false;
    //            options.Password.RequireLowercase = false;
    //            options.SignIn.RequireConfirmedEmail = false;
    //            options.SignIn.RequireConfirmedPhoneNumber = false;
    //        })
    //          .AddDefaultTokenProviders()
    //        //  .AddRoles<IdentityRole>()
    //         .AddEntityFrameworkStores<JetSendDbContext>();
    //        var key = Encoding.ASCII.GetBytes(appSettings.JwtKey!);
    //        services.AddAuthentication(options =>
    //        {
    //            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    //        })
    //        .AddJwtBearer(options =>
    //        {
    //            options.SaveToken = false;
    //            options.TokenValidationParameters = new TokenValidationParameters
    //            {
    //                ValidateIssuerSigningKey = true,
    //                IssuerSigningKey = new SymmetricSecurityKey(key),
    //                ValidateIssuer = false,
    //                ValidateAudience = false,
    //                ValidateLifetime = true,
    //            };
    //        });
    //        services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromHours(5));

    //    }
    //    static void RepoServices(this IServiceCollection services, IConfiguration config)
    //    {
    //        services.AddScoped<IUnitOfWork, UnitOfWork>();
    //        services.AddScoped<IManageUserRepo, ManageUserRepo>();

    //    }

    //}

}
