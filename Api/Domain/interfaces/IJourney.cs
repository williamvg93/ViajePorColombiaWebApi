using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.entities;

namespace Domain.interfaces
{
    public interface IJourney : IGenericRepository<Journey>
    {
        Task<List<Journey>> GetAllJourneyFlight();
        Task<List<Journey>> GetAllJourneyFlightTrasnport();
        Task<Journey> GetJourneyFlightTrasnportById(int id);
    }
}