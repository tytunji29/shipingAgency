using JetSend.Domain.Entities;
using JetSend.Domain.Entities.Auths;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using static JetSend.Respository.DataContext.JetSendDbContextFactory;

namespace JetSend.Respository.DataContext;

public class JetSendDbContextFactory : IDesignTimeDbContextFactory<JetSendDbContext>
{
    public JetSendDbContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../UsersAPI"))
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<JetSendDbContext>();
        optionsBuilder.UseSqlServer(config.GetConnectionString("JetSendcon"));

        return new JetSendDbContext(optionsBuilder.Options);
    }
}

public class JetSendDbContext : IdentityDbContext<ApplicationUsers>
{
    public JetSendDbContext(DbContextOptions<JetSendDbContext> option) : base(option)
    {
    }

    public DbSet<ApplicationUsers> ApplicationUsers { get; set; }
    public DbSet<ApplicationUsersRole> ApplicationUsersRole { get; set; }
    public DbSet<RegionLga> RegionLga { get; set; }
    public DbSet<RegionState> RegionState { get; set; }
    public DbSet<Management> Managements { get; set; }
    public DbSet<OtpVerificationLog> OtpVerificationLogs { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Agent> Agents { get; set; }
    public DbSet<AgentBankDetail> AgentBankDetails { get; set; }
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
    public DbSet<CustomerCard> CustomerCards { get; set; }
    public DbSet<CustomerAcceptedTransporter> CustomerAcceptedTransporters { get; set; }
    public DbSet<ChatMessage> ChatMessages { get; set; }
}