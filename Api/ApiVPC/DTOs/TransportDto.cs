using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVPC.DTOs
{
    public class TransportDto
    {
        public int Id { get; set; }
        public string FlightCarries { get; set; }
        public string FlightNumber { get; set; }
    }
}