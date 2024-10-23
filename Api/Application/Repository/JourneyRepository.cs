using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.entities;
using Domain.interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Journey>> GetAllJourneyFlight()
        {
            return await _context.Journeys
            .Include(fli => fli.Flights)
            .ToListAsync();
        }

        public async Task<List<Journey>> GetAllJourneyFlightTrasnport()
        {
            return await _context.Journeys
            .Include(fli => fli.Flights)
                .ThenInclude(tra => tra.Transports)
            .ToListAsync();
        }

        public async Task<Journey> GetJourneyFlightTrasnportById(int id)
        {
            return await _context.Journeys
            .Include(fli => fli.Flights)
                .ThenInclude(tra => tra.Transports)
            .Where(jou => jou.Id == id)
            .FirstOrDefaultAsync();
        }
    }
}