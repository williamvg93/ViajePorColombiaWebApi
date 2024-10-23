using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Domain.interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Flight>> GetAllFlightsAndTranspors()
        {
            return await _context.Flights
            .Include(t => t.Transports)
            .ToListAsync();
        }

        public async Task<Flight> GetFlightAndTranspor(int Id)
        {
            return await _context.Flights
            .Include(t => t.Transports)
            .Where(t => t.Id == Id).FirstOrDefaultAsync();
        }
    }
}