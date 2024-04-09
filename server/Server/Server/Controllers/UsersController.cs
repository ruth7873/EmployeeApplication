using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.API.Model;
using Server.Core.DTOs;
using Server.Core.Entities;
using Server.Core.Services;
using Server.Data.Migrations;
using Server.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetUsersAsync());
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserPostModel user)
        {
            var userToAdd = _mapper.Map<User>(user);
            var addedUser = await _userService.AddUserAsync(userToAdd);
            return Ok(addedUser);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UserPostModel value)
        {
            var userToUpdate = _mapper.Map<User>(value);
            var updatedUser = await _userService.AddUserAsync(userToUpdate);
            return Ok(userToUpdate);
        }

    }
}
