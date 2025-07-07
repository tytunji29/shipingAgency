using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JetSend.Respository.Migrations
{
    /// <inheritdoc />
    public partial class jhbnkh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TransId",
                table: "RateRiders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TransId",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransId",
                table: "RateRiders");

            migrationBuilder.DropColumn(
                name: "TransId",
                table: "Quotes");
        }
    }
}
