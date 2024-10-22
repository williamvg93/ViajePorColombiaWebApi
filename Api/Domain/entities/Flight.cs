using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.entities
{
    public class Flight : BaseEntity
    {
        public int TrasportId { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public double Price { get; set; }
        public Transport Transports { get; set; }
        public ICollection<Journey> Trips { get; set; }
                
    }
}