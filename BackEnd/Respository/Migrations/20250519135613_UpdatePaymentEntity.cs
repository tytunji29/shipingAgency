using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VubidsRespository.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePaymentEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Payments",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "ExpiryDate",
                table: "Payments",
                newName: "ShipmentId");

            migrationBuilder.RenameColumn(
                name: "CardNumber",
                table: "Payments",
                newName: "Receiver");

            migrationBuilder.RenameColumn(
                name: "CVV",
                table: "Payments",
                newName: "PaymentMethod");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Payments",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PaymentId",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "CustomerCards",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CardNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiryDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CVV = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimeCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeUpdated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerCards", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerCards");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Payments",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ShipmentId",
                table: "Payments",
                newName: "ExpiryDate");

            migrationBuilder.RenameColumn(
                name: "Receiver",
                table: "Payments",
                newName: "CardNumber");

            migrationBuilder.RenameColumn(
                name: "PaymentMethod",
                table: "Payments",
                newName: "CVV");
        }
    }
}
