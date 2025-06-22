using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetSend.Domain.Dtos.ResponseDtos;
using JetSend.Domain.Entities;
using JetSend.Domain.Interfaces.IRepositories;
using JetSend.Respository.DataContext;

namespace JetSend.Respository.Repos
{
    public class ManageTransporterRepo : IManageTransporterRepo
    {
        private readonly JetSendDbContext _db;
        public ManageTransporterRepo(JetSendDbContext db)
        {
            _db = db;
        }

        public async Task AddTransporter(Transporter request)
        {
            await _db.Transporters.AddAsync(request);
            await _db.SaveChangesAsync();
        }


        public async Task<IEnumerable<TransporterResponseDto>> GetAllTransporter()
        {
            var transporters = await (from transporter in _db.Transporters
                                      join shipment in _db.Shipments
                                      on transporter.ShipmentId equals shipment.Id
                                     
                                      join deliveryPickup in _db.DeliveryPickups
                                      on shipment.Id equals deliveryPickup.ShipmentId

                                      join review in _db.Reviews
                                      on transporter.Id equals review.TransporterId 

                                      select new TransporterResponseDto
                                      {
                                          ShipmentId = shipment.ShipmentId,
                                          EstimatedDelivery = deliveryPickup.DeliveryDate,
                                          Email = transporter.Email,
                                          PhoneNumber = transporter.PhoneNumber,
                                          Status = shipment.Status,
                                          Transporter = transporter.Name,
                                          VehicleInfo = transporter.VehicleInfo ?? "Unknown",
                                          Reviews = review.Comments ?? "No reviews"
                                      }).ToListAsync();
            return transporters;
        }
    }
}
