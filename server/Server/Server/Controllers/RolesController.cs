using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.API.Model;
using Server.Core.Entities;
using Server.Core.Services;
using Server.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RolesController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: api/<RolesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(roles);
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var role = await _roleService.GetRoleByIdAsync(id);
            if (role == null)
                return NotFound();
            return Ok(role);
        }

        // POST api/<RolesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RolePostModel role)
        {
            var RoleToAdd = _mapper.Map<Role>(role);
            var addedRole = await _roleService.AddRoleAsync(RoleToAdd);
            if (addedRole == null)
            {
                return BadRequest("This role already exists!! Enter another role");
            }
            var newRole = await _roleService.GetRoleByIdAsync(addedRole.Id);
            return Ok(newRole);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _roleService.DeleteRoleAsync(id);
            return Ok();
        }

    }
}
