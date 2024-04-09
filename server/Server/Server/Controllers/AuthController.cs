using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.API.Model;
using Server.Core.Entities;
using Server.Core.Services;
using Server.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration configuration,IMapper mapper,IAuthService authService)
        {
            _configuration = configuration;
            _mapper = mapper;
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var u=_mapper.Map<User>(loginModel);
            User user =await _authService.LoginAsunc(u);

            if (user != null && user.Password == loginModel.Password)
            {
                var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "ruth"),
                new Claim(ClaimTypes.Role, "teacher")
            };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }

        [HttpPost("/api/Register")]
        public IActionResult PasswordToAddUser([FromBody] string password)
        {
            if (password.Equals(_configuration["addingUsersPassword"]))
                return Ok();
            return BadRequest("the password is invalid!!");
        }
    }

}
