using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VubidsRespository.Migrations
{
    /// <inheritdoc />
    public partial class UpdateShipmentEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Agents");

            migrationBuilder.AlterColumn<long>(
                name: "TransporterId",
                table: "Shipments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Shipments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "ItemCategoryId",
                table: "ItemTypes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Shipments");

            migrationBuilder.DropColumn(
                name: "ItemCategoryId",
                table: "ItemTypes");

            migrationBuilder.AlterColumn<long>(
                name: "TransporterId",
                table: "Shipments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Agents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActiveOrder = table.Column<byte>(type: "tinyint", nullable: false),
                    DriverLicense = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    IdentityNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PlateNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RegionCovered = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    TimeCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeUpdated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agents", x => x.Id);
                });
        }
    }
}
