using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Persistence.data.Configuration
{
    public class TransportConfiguration : IEntityTypeConfiguration<Transport>
    {
        public void Configure(EntityTypeBuilder<Transport> builder)
        {
            builder.ToTable("trasport");
            
            builder.HasKey(pk => pk.Id)
            .HasName("PRIMARY");
            builder.Property(col => col.Id).
            ValueGeneratedOnAdd();

            builder.Property(col => col.FlightCarries)
            .HasMaxLength(50);

            builder.Property(col => col.FlightNumber)
            .HasMaxLength(50);
                  
            
        }
    }
}