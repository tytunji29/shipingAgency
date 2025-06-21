using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VubidsRespository.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Vubids.Domain.Entities.Auths;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using VubidsRespository;
using Vubids.Domain.Interfaces.IRepositories;
using VubidsRespository.Repos;
using MeetTech.Infranstructure.Model.Configuration;
using System.Security.Claims;
using System.Security.Principal;

namespace VubidsServices.Extensions
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
    //        services.AddDbContext<VubidDbContext>(opt =>
    //        {
    //            opt.UseSqlServer(configuration.GetConnectionString("vubidcon"));

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
    //         .AddEntityFrameworkStores<VubidDbContext>();
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
