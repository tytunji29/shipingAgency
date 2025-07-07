using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JetSend.Respository.Migrations
{
    /// <inheritdoc />
    public partial class sssss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShipmentId",
                table: "RateRiders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShipmentId",
                table: "RateRiders");
        }
    }
}
