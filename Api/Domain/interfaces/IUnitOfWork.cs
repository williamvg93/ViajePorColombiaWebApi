using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.interfaces
{
    public interface IUnitOfWork
    {
        ITransport Transports { get; set;}
        IFlight Flights { get; set;}
        IJourney Journeys { get; set;}
        Task<int> SaveAsync();
    }
}