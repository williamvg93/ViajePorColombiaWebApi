using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.interfaces
{
    public interface IUnitOfWork
    {
        ITransport Transports { get;}
        IFlight Flights { get;}
        IJourney Journeys { get;}
        Task<int> SaveAsync();
    }
}