using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiVPC.DTOs.Get.FlightTransport
{
    public class FlightTransEditDto
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public double Price { get; set; }
        public TranspFlightEditDto TrasportId { get; set; }
    }
}