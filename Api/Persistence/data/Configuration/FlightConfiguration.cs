using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.data.Configuration
{
    public class FlightConfiguration : IEntityTypeConfiguration<Flight>
    {
        public void Configure(EntityTypeBuilder<Flight> builder)
        {
            builder.ToTable("flight");

            builder.HasKey(pk => pk.Id)
            .HasName("PRIMARY");

            builder.Property(col => col.Origin)
            .HasMaxLength(20)
            .IsRequired();

            builder.Property(col => col.Destination)
            .HasMaxLength(20)
            .IsRequired();

            builder.Property(col => col.Price)
            .IsRequired();

            builder.Property(fk => fk.TrasportId)
            .HasColumnName("fk_IdTrasport");

            builder.HasOne(fly => fly.Transports)
            .WithMany(trans => trans.Flights)
            .HasForeignKey(fly => fly.TrasportId);
        }
        
    }
}