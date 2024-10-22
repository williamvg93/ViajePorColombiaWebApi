using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.unitOfWork;
using Domain.interfaces;

namespace ApiVPC.Extensions
{
    public static class ApplicationServiceExtencion
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}