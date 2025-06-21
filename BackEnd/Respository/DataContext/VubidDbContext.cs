using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Vubids.Domain.Entities;
using Vubids.Domain.Entities.Auths;

namespace VubidsRespository.DataContext
{
    public class VubidDbContext : IdentityDbContext<ApplicationUsers>
    {
        public VubidDbContext(DbContextOptions<VubidDbContext> option) : base(option)
        {
        }

        public DbSet<ApplicationUsers> ApplicationUsers { get; set; }
        public DbSet<Management> Managements { get; set; }
        public DbSet<OtpVerificationLog> OtpVerificationLogs { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Receiver> Receivers { get; set; }
        public DbSet<Sender> Senders { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<DeliveryPickup> DeliveryPickups { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<ItemType> ItemTypes { get; set; }
        public DbSet<Quotes> Quotes { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Transporter> Transporters { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Support> Supports { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<CustomerCard> CustomerCards{ get; set; }
        public DbSet<CustomerAcceptedTransporter> CustomerAcceptedTransporters { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
    }
}
