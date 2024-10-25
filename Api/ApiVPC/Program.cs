using Persistence.data;
using Microsoft.EntityFrameworkCore;
using ApiVPC.Extensions;
using System.Reflection;
using AspNetCoreRateLimit;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

// Agregando Controllers
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Habilitando al connfiguracion para las politicas Cors
builder.Services.ConfigureCors();

/* Habilitando configuraciones para el RateLimiting */
builder.Services.ConfigureRateLimiting();

// Agregando AutoMapper al proyecto y configurando para que busque las clases(Perfiles de mapeo) que hereden de Profile 
builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

// Agregando Servicios de la carpeta Extensions
builder.Services.AddApplicationServices();


// Agregando configuracion para la conexion a la BD
builder.Services.AddDbContext<ApiVpcContext>(options => {
    string connectionStr = builder.Configuration.GetConnectionString("conexMysql");
    options.UseMySql(connectionStr, ServerVersion.AutoDetect(connectionStr));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseIpRateLimiting();

// Necesario para que se reconozcan lso controlaldores que se crearon 
app.MapControllers();

//Aplicando las politicas Cors
app.UseCors("CorsPolicy");
app.Run();

