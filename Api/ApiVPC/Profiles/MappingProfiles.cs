using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiVPC.DTOs;
using ApiVPC.DTOs.Get;
using ApiVPC.DTOs.Post;
using AutoMapper;
using Domain.entities;

namespace ApiVPC.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles(){
            CreateMap<Transport, TransportDto>().ReverseMap();
            CreateMap<Flight, FlightDto>().ReverseMap();
            CreateMap<Journey, JourneyDto>().ReverseMap();

            CreateMap<Flight, FlightTransDto>()
            .ForMember(fli => fli.FlightCarries,
            opt => opt.MapFrom(tra => tra.Transports.FlightCarries));

            CreateMap<Journey, JourneyDTOPost>().ReverseMap();


            CreateMap<Journey, JourneyDto>()
            .ForMember(jou => jou.Flights, opt => opt.MapFrom(src => src.Flights));
            
        }
    }
}