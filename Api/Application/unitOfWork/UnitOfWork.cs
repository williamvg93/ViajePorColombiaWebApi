using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Repository;
using Domain.interfaces;
using Persistence.data;

namespace Application.unitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ApiVpcContext _context;
        private TransportRepository _transports;
        private FlightRepository _flights;
        private JourneyRepository _journeys;
    

        public UnitOfWork(ApiVpcContext context)
        {
            _context = context;
        }

        public ITransport Transports
        {
            get
            {
                _transports ??= new TransportRepository(_context);
                return _transports;
            }
        }
        public IFlight Flights
        {
            get
            {
                if (_flights == null)
                {
                    _flights = new FlightRepository(_context);
                }
                return _flights;
            }
        }

        public IJourney Journeys
        {
            get 
            {
                _journeys ??= new JourneyRepository(_context);
                return _journeys;
            }
        }

    
        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}