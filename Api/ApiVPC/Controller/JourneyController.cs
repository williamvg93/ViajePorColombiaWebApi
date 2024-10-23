using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVPC.DTOs;
using ApiVPC.DTOs.Get;
using ApiVPC.DTOs.Post;
using ApiVPC.Services;
using AutoMapper;
using Domain.entities;
using Domain.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiVPC.Controller
{
    public class JourneyController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly JourneyService _journeyService;
        private readonly IMapper _mapper;
    
        public JourneyController(IUnitOfWork unitOfWork, IMapper mapper, JourneyService journeyService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _journeyService = journeyService;
        }
    
        /* Get all Data from Table */
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<JourneyDto>>> Get()
        {
            var journeys = await _unitOfWork.Journeys.GetAllJourneyFlightTrasnport();
            /* return Ok(journeys); */
            return _mapper.Map<List<JourneyDto>>(journeys);
        }
    
        /* Get Data by ID */
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<JourneyDto>> Get(int id)
        {
            var journey = await _unitOfWork.Journeys.GetJourneyFlightTrasnportById(id);
            if (journey == null) return NotFound($"No se encontraorn Viajes con el ID : ({id})");
            return _mapper.Map<JourneyDto>(journey);
        }
    
        /* Add a new Data in the Table */
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post(JourneyDTOPost journeyDTOPost)
        {

            // Buscar vuelos directos o con escalas
            var flights = await _journeyService.SearchFlightsWithStopovers(journeyDTOPost.Origin, journeyDTOPost.Destination);

            if (flights == null || flights.Count == 0)
                return BadRequest("No se encontraron vuelos que conecten el origen con el destino.");

            // Calcular el precio total del viaje
            double totalPrice = flights.Sum(v => v.Price);

            // Crear el viaje
            var newJourney = new Journey
            {
                Origin = journeyDTOPost.Origin,
                Destination = journeyDTOPost.Destination,
                Price = totalPrice,
                Flights = flights
            };

            _unitOfWork.Journeys.Add(newJourney);
            await _unitOfWork.SaveAsync();

            return Ok(_mapper.Map<JourneyDto>(newJourney));
        }
    
        /* Update Data By ID  */
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<JourneyDto>> Put(int id, [FromBody] JourneyDto journeyDto)
        {
            var journey = _mapper.Map<Journey>(journeyDto);
            if (journey.Id == 0) journey.Id = id; 
            if (journey.Id != id) return BadRequest("Error en la Peticion, algo ocurrio con el ID ingresado");
            if (journey == null) return NotFound($"No Existe un Viaje con el ID : ({id})");
    
            journeyDto.Id = journey.Id;
            _unitOfWork.Journeys.Update(journey);
            await _unitOfWork.SaveAsync();
            return journeyDto;
        }
    
        /* Delete Data By ID */
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var journey = await _unitOfWork.Journeys.GetByIdAsync(id);
            if (journey == null) return NotFound();
            _unitOfWork.Journeys.Remove(journey);
            await _unitOfWork.SaveAsync();
            return Ok("Viaje eliminado correctamente");
        }
    }
}