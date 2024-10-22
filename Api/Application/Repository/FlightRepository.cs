using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Domain.interfaces;
using Persistence.data;

namespace Application.Repository
{
    public class FlightRepository : GenericRepository<Flight>, IFlight
    {
        private readonly ApiVpcContext _context;
    
        public FlightRepository(ApiVpcContext context) : base(context)
        {
            _context = context;
        }
    }
}