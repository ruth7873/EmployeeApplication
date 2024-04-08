using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentificationNumber { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public List<EmployeeRole> Roles { get; set; }
        public bool Status { get; set; }
        public Employee(string firstName, string lastName, string idNumber, DateTime start, DateTime birth, Gender gender, List<EmployeeRole> employeeRoles, bool status)
        {
            FirstName = firstName;
            LastName = lastName;
            IdentificationNumber = idNumber;
            EmploymentStartDate = start;
            DateOfBirth = birth;
            Gender = gender;
            Roles = employeeRoles;
            Status = status;
        }
        public Employee()
        {

        }
    }

    public enum Gender
    {
        Male,
        Female
    }
}
