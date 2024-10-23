using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;

namespace Domain.interfaces
{
    public interface IFlight : IGenericRepository<Flight>
    {
        Task<List<Flight>>GetAllFlightsAndTranspors();
        Task<Flight> GetFlightAndTranspor(int Id);
        
    }
}