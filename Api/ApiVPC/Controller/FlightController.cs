using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVPC.DTOs;
using ApiVPC.DTOs.Get;
using ApiVPC.Services;
using AutoMapper;
using Domain.entities;
using Microsoft.AspNetCore.Mvc;

namespace ApiVPC.Controller
{
    public class FlightController : BaseController
    {
        private readonly FlightService _flightService;
        private readonly IMapper _mapper;
    
        public FlightController(FlightService flightService, IMapper mapper)
        {
            _flightService = flightService;
            _mapper = mapper;
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
            if (flight == null) return NotFound($"There are no data with this ID: ('{id}')");
            return _mapper.Map<FlightTransDto>(flight);
        }
    
        /* Add a new Data in the Table */
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Flight>> Post(FlightDto flightDto)
        {
            var flight = await _flightService.AddFlight(flightDto);
            if (flight == null) return BadRequest();
            flightDto.Id = flight.Id;
            return CreatedAtAction(nameof(Post), new { id = flightDto.Id }, flightDto);
        }
    
        /* Update Data By ID  */
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<FlightDto>> Put(int id, [FromBody] FlightDto flightDto)
        {
            var flight = _mapper.Map<Flight>(flightDto);
            if (flight.Id == 0) flight.Id = id;
            if (flight.Id != id) return BadRequest();
            if (flight == null) return NotFound();
    
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
            if (flight == null) return NotFound("There are no data with the ID entered");
            _flightService.DeleteFlight(flight);
            return Ok("Flight was Deleted");
        }
    }
}