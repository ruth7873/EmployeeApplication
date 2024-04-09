using Server.Core.Entities;

namespace Server.API.Model
{
    public class EmployeeRolePostModel
    {
        public int RoleId { get; set; }
        public DateOnly EntryDate { get; set; }

    }
}
