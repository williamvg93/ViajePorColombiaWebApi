using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.entities
{
    public class Transport : BaseEntity
    {
        public string FlightCarries { get; set; }
        public string FlightNumber { get; set; }
        public ICollection<Flight> Flights {get; set;}
    }
}