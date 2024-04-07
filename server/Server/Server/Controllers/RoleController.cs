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
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RoleController(IRoleService roleService,IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: api/<RoleController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(roles);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var role = await _roleService.GetRoleByIdAsync(id);
            if (role == null)
                return NotFound();
            return Ok(role);
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RolePostModel role)
        {
            var RoleToAdd = _mapper.Map<Role>(role);
            var addedRole = await _roleService.AddRoleAsync(RoleToAdd);
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
