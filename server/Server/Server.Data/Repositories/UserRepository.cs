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
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }


        public async Task<IEnumerable<User>> GetUserssAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            User u = _context.Users.Find(id);
            if (u != null)
            {
                u.UserName = user.UserName;
                u.Password = user.Password;
            }
            await _context.SaveChangesAsync();
            return u;
        }

    }
}

