using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class EmployeeRoleDTO
    {

        public Role Role { get; set; }
        public DateTime EntryDate { get; set; } // תאריך כניסה לתפקיד

    }
}
