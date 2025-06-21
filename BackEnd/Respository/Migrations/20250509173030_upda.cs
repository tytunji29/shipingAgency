using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VubidsRespository.Migrations
{
    /// <inheritdoc />
    public partial class upda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IdentityNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    RegionCovered = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DriverLicense = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PlateNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ActiveOrder = table.Column<byte>(type: "tinyint", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    TimeCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeUpdated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agents", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Agents");
        }
    }
}
