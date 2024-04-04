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
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Role> AddRoleAsync(Role role)
        {
            // Make sure the ID is not explicitly set
            role.Id = 0; // Or whatever default value your entity framework expects for identity insert

            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

        //public async Task<Role> AddRoleAsync(Role role)
        //{
        //    _context.Roles.Add(role);
        //    await _context.SaveChangesAsync();
        //    return role;
        //}

        public async Task<Role> GetRoleByIdAsync(int id)
        {
            return await _context.Roles.FindAsync(id);        }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.Roles.ToListAsync();        }
    }
}
