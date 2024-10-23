using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVPC.DTOs.Get
{
    public class FlightTransDto
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public double Price { get; set; }
        public string FlightCarries { get; set; }
    }
}