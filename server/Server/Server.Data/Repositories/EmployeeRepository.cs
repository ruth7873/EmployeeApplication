using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            checkIfExists(employee);
            employee.Roles = employee.Roles.GroupBy(r => r.RoleId).Select(g => g.First()).ToList();
            employee.Id = 0;
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public void DeleteEmployee(int id)
        {
            var emp = _context.Employees.Find(id);
            if (emp != null)
            {
                emp.Status = false;
                _context.SaveChanges();
            }
        }
        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.Include(e => e.Roles).ThenInclude(em => em.Role).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.Where(emp => emp.Status).Include(e => e.Roles).ThenInclude(em => em.Role).ToListAsync();
        }
        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            Employee employeeToUpdate = await _context.Employees
            .Include(e => e.Roles) // Include related roles
            .FirstOrDefaultAsync(e => e.Id == id);

            if (employeeToUpdate != null)
            {
                // Update employee properties
                employeeToUpdate.EmploymentStartDate = employee.EmploymentStartDate;
                employeeToUpdate.Status = employee.Status;
                employeeToUpdate.IdentificationNumber = employee.IdentificationNumber;
                employeeToUpdate.Gender = employee.Gender;
                employeeToUpdate.FirstName = employee.FirstName;
                employeeToUpdate.LastName = employee.LastName;
                employeeToUpdate.DateOfBirth = employee.DateOfBirth;
                employeeToUpdate.Roles = employee.Roles.GroupBy(r => r.RoleId).Select(g => g.First()).ToList();

                await _context.SaveChangesAsync();
                return employeeToUpdate;
            }

            return await AddEmployeeAsync(employee); // Employee with the given ID not found
        }

        public void checkIfExists(Employee employee)
        {
            var a = _context.Employees.FirstOrDefault(emp => emp.IdentificationNumber == employee.IdentificationNumber);
            if (a != null)
            {
                throw new InvalidOperationException("This Identification Number is already exists.");
            }
        }
    }
}
