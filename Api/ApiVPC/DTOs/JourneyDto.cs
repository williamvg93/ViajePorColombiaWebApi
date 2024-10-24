using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVPC.DTOs.Get;

namespace ApiVPC.DTOs
{
    public class JourneyDto
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public double Price { get; set; }
        public List<FlightTransDto> Flights { get; set; }
    }
}