using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVPC.DTOs;
using AutoMapper;
using Domain.entities;
using Domain.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiVPC.Services
{
    public class FlightService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FlightService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Flight>> GetList()
        {
            var flights = await _unitOfWork.Flights.GetAllFlightsAndTranspors();
            return flights;
        }

        public async Task<Flight> GetById(int id)
        {
            var flight = await _unitOfWork.Flights.GetFlightAndTranspor(id);
            return flight;
        }

        public async Task<Flight> AddFlight(FlightDto flightDto)
        {
            var flight = _mapper.Map<Flight>(flightDto);

            this._unitOfWork.Flights.Add(flight);
            await _unitOfWork.SaveAsync();
            return flight;
        }

        public async Task<Flight> UpdateFlight(Flight flight)
        {
            _unitOfWork.Flights.Update(flight);
            await _unitOfWork.SaveAsync();
            return flight;
        }

    }
}