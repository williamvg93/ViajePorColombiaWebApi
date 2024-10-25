using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVPC.DTOs;
using ApiVPC.DTOs.Get;
using ApiVPC.Services;
using AutoMapper;
using Domain.entities;
using Domain.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiVPC.Controller
{
    public class FlightController : BaseController
    {
        private readonly FlightService _flightService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
    
        public FlightController(FlightService flightService, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _flightService = flightService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
    
        /* Get all Data from Table */
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<FlightTransDto>>> Get()
        {
            return _mapper.Map<List<FlightTransDto>>(await _flightService.GetList());
        }
    
        /* Get Data by ID */
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FlightTransDto>> Get(int id)
        {
            var flight = await _flightService.GetById(id);
            if (flight == null) return NotFound( new {error = $"There are no data with this ID: ('{id}')" } );
            return _mapper.Map<FlightTransDto>(flight);
        }
    
        /* Add a new Data in the Table */
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Flight>> Post(FlightDto flightDto)
        {
            if (string.IsNullOrWhiteSpace(flightDto.Origin) || string.IsNullOrWhiteSpace(flightDto.Destination) || string.IsNullOrWhiteSpace(flightDto.TrasportId.ToString()) || flightDto.Price <= 0 || flightDto.TrasportId <= 0)
            {
                return Ok(new { error = "Los campos 'Origin', 'Destination', 'TrasportId' y 'Price' son obligatorios, no pueden estar vacios !!!, los campos Price y TransportId no puede ser menor o igual a 0" });
            }

            var flight = await _flightService.AddFlight(flightDto);
            if (flight == null) return BadRequest(new
            { error = "Error inesperado al momento de crear el registro !!!" });
            flightDto.Id = flight.Id;

            var flightResponse = await _flightService.GetById(flight.Id);
            return Ok(_mapper.Map<FlightTransDto>(flightResponse));
            /* return CreatedAtAction(nameof(Post), new { id = flightDto.Id }, flightDto); */
        }
    
        /* Update Data By ID  */
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<FlightDto>> Put(int id, [FromBody] FlightDto flightDto)
        {
            if (string.IsNullOrWhiteSpace(flightDto.Origin) || string.IsNullOrWhiteSpace(flightDto.Destination) || string.IsNullOrWhiteSpace(flightDto.TrasportId.ToString()) || flightDto.Price <= 0 )
            {
                return Ok(new { error = "Los campos 'Origin', 'Destination', 'TrasportId' y 'Price' son obligatorios, no pueden estar vacios !!!, el campo Price no puede ser menor o igual a 0" });
            }

            var flight = _mapper.Map<Flight>(flightDto);
            if (flight.Id == 0) flight.Id = id;
            if (flight.Id != id) return BadRequest(new { error = $"Error con el número de ID({id}) ingresado"});
            if (flight == null) return NotFound(new { error = $"no se encontraron Vuelos con el número de Id({id}) Ingresado" });
    
            flightDto.Id = flight.Id;
            await _flightService.UpdateFlight(flight);
            return flightDto;
        }
    
        /* Delete Data By ID */
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var flight = await _flightService.GetById(id);
            if (flight == null) return NotFound( new { error = $"There are no data with the ID({id}) entered" } );
            _unitOfWork.Flights.Remove(flight);
            await _unitOfWork.SaveAsync();
            return Ok( new {success= "Flight was Deleted" });
        }
    }
}