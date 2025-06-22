using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Respository;

namespace UtilitiesServices
{
    public static class ServiceCollections
    {
        public static IServiceCollection ServicesCollection(this IServiceCollection services)
        {
            services.RegisterServices();
            return services;
        }

        static void RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
        }
}
