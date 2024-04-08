using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.API.Model;
using Server.Core.DTOs;
using Server.Core.Entities;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var emps = await _employeeService.GetAllEmployeesAsync();
            var empDTO = emps.Select(e => _mapper.Map<EmployeeDTO>(e));
            return Ok(empDTO);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var emp = await _employeeService.GetEmployeeByIDAsync(id);
            var empDTO = _mapper.Map<EmployeeDTO>(emp);
            if (empDTO == null)
                return NotFound();
            return Ok(empDTO);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] EmployeePostModel employee)
        {
            var empToAdd = _mapper.Map<Employee>(employee);
            var addedEmp = await _employeeService.AddEmployeeAsync(empToAdd);
            var newEmp = await _employeeService.GetEmployeeByIDAsync(addedEmp.Id);
            var empDTO = _mapper.Map<EmployeeDTO>(newEmp);
            return Ok(empDTO);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var empToUpdate = _mapper.Map<Employee>(employee);
            var emp = await _employeeService.UpdateEmployeeAsync(id, empToUpdate);
            var newEmp = await _employeeService.GetEmployeeByIDAsync(emp.Id);
            var empDTO = _mapper.Map<EmployeeDTO>(newEmp);
            return Ok(empDTO);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _employeeService.DeleteEmployeeAsync(id);
            return Ok();
        }
    }
}
