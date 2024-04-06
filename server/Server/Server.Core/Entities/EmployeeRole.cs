using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class EmployeeRole
    {
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime EntryDate { get; set; } // תאריך כניסה לתפקיד


        //public EmployeeRole(int employeeId, int roleId, DateTime entryDate)
        //{
        //    EmployeeId = employeeId;
        //    RoleId = roleId;
        //    EntryDate = entryDate;
        //}
    }
}
