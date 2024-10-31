using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVPC.DTOs;
using AutoMapper;
using Domain.entities;
using Domain.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiVPC.Controller
{
    public class TransportController(IUnitOfWork unitOfWork, IMapper mapper) : BaseController
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;

        /* Get all Data from Table */
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<TransportDto>>> Get()
        {
            var transports = await _unitOfWork.Transports.GetAllAsync();
            /* return Ok(transports); */
            return _mapper.Map<List<TransportDto>>(transports);
        }

        /* Get Data by ID */
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TransportDto>> Get(int id)
        {
            var trasnport = await _unitOfWork.Transports.GetByIdAsync(id);
            if (trasnport == null) return NotFound(new { error = $"no se encontraron trasnportes con el número de Id({id}) Ingresado" });
            /* return Ok(trasnport); */
            return _mapper.Map<TransportDto>(trasnport);
        }

        /* Add a new Data in the Table */
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Transport>> Post(TransportDto transportDto)
        {
            if (string.IsNullOrWhiteSpace(transportDto.FlightCarries) || string.IsNullOrWhiteSpace(transportDto.FlightNumber))
            {
                return BadRequest(new { error = "Los campos 'flightCarries' y 'flightNumber' son obligatorios, no pueden estar vacios !!!." });
            }

            var transport = _mapper.Map<Transport>(transportDto);

            this._unitOfWork.Transports.Add(transport);
            await _unitOfWork.SaveAsync();

            if (transport == null) return BadRequest(new
            { error = "Error inesperado al momento de crear el registro !!!" });

            transportDto.Id = transport.Id;
            return CreatedAtAction(nameof(Post), new { id = transportDto.Id }, transportDto);
        }


        /* Update Data By ID  */
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TransportDto>> Put(int id, [FromBody] TransportDto transportDto)
        {
            if (string.IsNullOrWhiteSpace(transportDto.FlightCarries) || string.IsNullOrWhiteSpace(transportDto.FlightNumber))
            {
                return Ok(new { error = "Los campos 'flightCarries' y 'flightNumber' son obligatorios, no pueden estar vacios !!!." });
            }

            var transport = _mapper.Map<Transport>(transportDto);

            if (transport.Id == 0) transport.Id = id;

            if (transport.Id != id) return BadRequest( new {error = $"Error con el número de ID({id}) ingresado"});
            
            if (transport == null) return NotFound(new { error = $"no se encontraron trasnportes con el número de Id({id}) Ingresado" });

            transportDto.Id = transport.Id;
            _unitOfWork.Transports.Update(transport);
            await _unitOfWork.SaveAsync();
            return transportDto;
        }


        /* Delete Data By ID */
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var transport = await _unitOfWork.Transports.GetByIdAsync(id);

            if (transport == null) return NotFound(new { error = $"no se encontraron trasnportes con el núumero de Id({id}) Ingresado" });

            _unitOfWork.Transports.Remove(transport);
            await _unitOfWork.SaveAsync();
            return Ok(new {success = $"The '{transport.FlightCarries}' Transport was Deleted" });
        }


    }
}