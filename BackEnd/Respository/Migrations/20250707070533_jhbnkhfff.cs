using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JetSend.Respository.Migrations
{
    /// <inheritdoc />
    public partial class jhbnkhfff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RaterCount",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TransporterRating",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RaterCount",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "TransporterRating",
                table: "Quotes");
        }
    }
}
