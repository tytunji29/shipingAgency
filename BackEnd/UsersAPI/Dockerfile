# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy everything and restore
COPY *.sln .
COPY JetSend.API/*.csproj ./JetSend.API/
COPY JetSend.Domain/*.csproj ./JetSend.Domain/
COPY JetSend.Repository/*.csproj ./JetSend.Repository/
COPY JetSend.Services/*.csproj ./JetSend.Services/
COPY UtilitiesServices/*.csproj ./UtilitiesServices/

RUN dotnet restore

# Copy the rest of the code
COPY . .

# Publish the app
WORKDIR /app/JetSend.API
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/JetSend.API/out .

# Expose port (adjust based on your API settings)
EXPOSE 80

# Entry point
ENTRYPOINT ["dotnet", "JetSend.API.dll"]
