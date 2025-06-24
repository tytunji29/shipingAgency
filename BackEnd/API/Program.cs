using JetSend.API.Extensions;
using Microsoft.AspNetCore.Mvc;
using JetSend.API.Middleware;
using UtilitiesServices;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApiVersioning(Options =>
{
    Options.DefaultApiVersion = ApiVersion.Default;
    Options.ReportApiVersions = true;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("ProductionPolicy", policy =>
    {
        policy.WithOrigins("https://shippingagencyfe.onrender.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // If using cookies/auth
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddServices(builder.Configuration);
builder.Services.ServicesCollection();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}
app.UseSwagger();
app.UseSwaggerUI();
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseApiVersioning();
//app.UseRouting();
//app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
// Middleware pipeline
app.UseHttpsRedirection();
app.UseRouting();

// Use CORS policy (AFTER UseRouting, BEFORE UseAuthorization)
app.UseCors("ProductionPolicy");
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
    context.Response.Headers.Add("X-Download-Options", "noopen");
    context.Response.Headers.Add("X-Xss-Protection", "1; mode=block");
    await next();
});
//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseStatusCodePages();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<Hub>("/chatHub");
});
//app.MapControllers();

app.Run();
