using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.data.Configuration
{
    public class JourneyConfiguration : IEntityTypeConfiguration<Journey>
    {
        public void Configure(EntityTypeBuilder<Journey> builder)
        {
            builder.ToTable("journey");

            builder.HasKey(pk => pk.Id)
            .HasName("PRIMARY");

            builder.Property(col => col.Origin)
            .HasMaxLength(20)
            .IsRequired();

            builder.Property(col => col.Destination)
            .HasMaxLength(20)
            .IsRequired();

            builder.HasMany(jou => jou.Flights)
            .WithMany(fli => fli.Trips)
            .UsingEntity(tab => tab.ToTable("JourneyFlight"));
        }
    }
}