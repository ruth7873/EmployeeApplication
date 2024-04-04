using Server.Core.Entities;

namespace Server.API.Model
{
    public class EmployeeRolePostModel
    {
        public int RoleId { get; set; } // מזהה התפקיד
        public DateTime EntryDate { get; set; } // תאריך כניסה לתפקיד

    }
}
