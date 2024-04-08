using Server.Core.Entities;

namespace Server.API.Model
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentificationNumber { get; set; }
        public DateOnly EmploymentStartDate { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public List<EmployeeRolePostModel> Roles { get; set; }
        public bool Status { get; set; }
    }
}

