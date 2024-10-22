using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Domain.interfaces;
using Persistence.data;

namespace Application.Repository
{
    public class JourneyRepository : GenericRepository<Journey>, IJourney
    {
        private readonly ApiVpcContext _context;
    
        public JourneyRepository(ApiVpcContext context) : base(context)
        {
            _context = context;
        }
    }
}