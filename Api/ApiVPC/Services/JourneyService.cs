using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.entities;
using Domain.interfaces;

namespace ApiVPC.Services
{
    public class JourneyService
    {
        private readonly IUnitOfWork _unitOfWork;
        
        private readonly IMapper _mapper;

        public JourneyService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<Flight>> SearchFlightsWithStopovers(string ori, string dest)
        {
            var directFligths = await _unitOfWork.Flights.GetAllFlightsAndTranspors();
            var foundFligts = directFligths.Where(v => v.Origin == ori && v.Destination == dest).ToList();

            // Si hay vuelos directos, retornar
            if (foundFligts.Count != 0) return foundFligts;

            // Si no hay vuelos directos, buscar escalas
            var flightsWithStopovers = new List<Flight>();
            var checkedFlights = new HashSet<int>();

            await SearchScales(ori, dest, flightsWithStopovers, checkedFlights);

            if (flightsWithStopovers.Count == 0) return null;

            return flightsWithStopovers;
        }

        public async Task<bool> SearchScales(string currentOri, string finalDest, List<Flight> foundFlights, HashSet<int> checkedFlights)
        {
            var availableFlights = await _unitOfWork.Flights.GetAllFlightsAndTranspors();
            var vuelosSiguientes = availableFlights.Where(v => v.Origin == currentOri && !checkedFlights.Contains(v.Id)).ToList();

            foreach (var flight in vuelosSiguientes)
            {
                checkedFlights.Add(flight.Id);
                foundFlights.Add(flight);

                if (flight.Destination == finalDest) return true;

                // Búsqueda recursiva de escalas
                if (await SearchScales(flight.Destination, finalDest, foundFlights, checkedFlights))
                {
                    return true;
                }

                // Eliminar si no hace parte de la ruta final
                foundFlights.Remove(flight);  
            }

            return false;
        }

    }
}