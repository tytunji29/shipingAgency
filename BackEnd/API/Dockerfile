# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ../*.sln . 

COPY ../JetSend.API/*.csproj ./JetSend.API/
COPY ../JetSend.Domain/*.csproj ./JetSend.Domain/
COPY ../JetSend.Repository/*.csproj ./JetSend.Repository/
COPY ../JetSend.Services/*.csproj ./JetSend.Services/
COPY ../UtilitiesServices/*.csproj ./UtilitiesServices/

RUN dotnet restore

COPY .. .

WORKDIR /src/JetSend.API
RUN dotnet publish -c Release -o /app

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .

EXPOSE 80
ENTRYPOINT ["dotnet", "JetSend.API.dll"]
