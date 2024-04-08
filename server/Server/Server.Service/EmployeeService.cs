using Server.Core.Entities;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            IsValidEmployee(employee);
            return await _employeeRepository.AddEmployeeAsync(employee);
        }

        public void DeleteEmployeeAsync(int id)
        {
            _employeeRepository.DeleteEmployee(id);
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _employeeRepository.GetEmployeesAsync();
        }

        public async Task<Employee> GetEmployeeByIDAsync(int id)
        {
            return await _employeeRepository.GetEmployeeByIdAsync(id);
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            IsValidEmployee(employee);
            return await _employeeRepository.UpdateEmployeeAsync(id, employee);
        }

        //validations:
        public static void IsValidEmployee(Employee employee)
        {
            if (!IsValidIsraeliId(employee.IdentificationNumber))
                throw new ArgumentException("The Identification Number entered is incorrect.");
            if (!IsOverAge(employee.DateOfBirth))
                throw new ArgumentException("The employee must be over 18 years old.");

            if (employee.EmploymentStartDate < employee.DateOfBirth)
                throw new ArgumentException("The start date is incorrect.");
            employee.Roles.ForEach(role =>
            {
                if (role.EntryDate < employee.EmploymentStartDate)
                    throw new ArgumentException("The date of entry into the position must be after the date of entry into the job.");
            });
        }
        public static bool IsValidIsraeliId(string id)
        {
            if (string.IsNullOrEmpty(id) || id.Length != 9 || !id.All(char.IsDigit))
            {
                return false;
            }

            int[] digits = id.Select(c => int.Parse(c.ToString())).ToArray();
            int weightedDigitsSum = digits
                .Select((digit, i) => digit * ((i % 2) + 1))
                .Sum(digit => digit > 9 ? digit - 9 : digit);

            return weightedDigitsSum % 10 == 0;
        }

        public static bool IsOverAge(DateOnly birthDate)
        {
            // חישוב הגיל
            int age = DateTime.Today.Year - birthDate.Year;

            // בדיקה האם הגיל גדול מ-18
            return age >= 18;
        }
    }
}
