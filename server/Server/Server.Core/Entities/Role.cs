using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public bool IsManagementRole { get; set; }
        public Role(int roleId, string roleName, bool isManagementRole)
        {
            this.Id = roleId;
            this.RoleName = roleName;
            this.IsManagementRole = isManagementRole;
        }
        public Role()
        {

        }
    }

}
