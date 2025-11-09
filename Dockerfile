# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar solución y proyecto
COPY ["app-congreso/app-congreso.csproj", "app-congreso/"]
RUN dotnet restore "app-congreso/app-congreso.csproj"

# Copiar el resto del código y compilar
COPY . .
WORKDIR "/src/app-congreso"
RUN dotnet publish "app-congreso.csproj" -c Release -o /app/publish

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "app-congreso.dll"]
