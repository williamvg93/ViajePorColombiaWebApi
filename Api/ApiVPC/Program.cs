using Persistence.data;
using Microsoft.EntityFrameworkCore;
using ApiVPC.Extensions;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Agregando AutoMapper al proyecto y configurando para que busque las clases(Perfiles de mapeo) que hereden de Profile 
builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

// Agregando Servicios de la carpeta Extensions
builder.Services.AddApplicationServices();

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
app.Run();

