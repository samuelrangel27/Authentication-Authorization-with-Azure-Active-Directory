using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("myAllowSpecificOrigins",
    builder =>
    {
        builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
    });
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        var azureCnf = builder.Configuration.GetSection("AzureAD");
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.Authority = azureCnf.GetValue<string>("Authority");
        options.TokenValidationParameters = new TokenValidationParameters()
        {

            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = azureCnf.GetValue<string>("Audience"),
            ValidIssuer = azureCnf.GetValue<string>("ValidIssuer")
        };
        options.Events = new JwtBearerEvents()
        {
            OnTokenValidated = ctx =>
            {
                return Task.CompletedTask;
            },
            OnAuthenticationFailed = ctx =>
            {
                return Task.CompletedTask;
            },
            OnChallenge = ctx =>
            {
                return Task.CompletedTask;
            },
            OnForbidden = ctx =>
            {
                return Task.CompletedTask;
            }
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("hero-api.User", policyBuilder => policyBuilder.RequireClaim(ClaimTypes.Role, "hero-api")) ;
    options.AddPolicy("hero-api.Admin", policyBuilder => policyBuilder.RequireClaim(ClaimTypes.Role, "hero-api.Admin"));
    options.DefaultPolicy = options.GetPolicy("hero-api.User");
});

builder.Services.AddMvc(config =>
{
    config.Filters.Add(new AuthorizeFilter());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("myAllowSpecificOrigins");

app.MapControllers();

app.Run();
