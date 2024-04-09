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
    public class AuthRepository:IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> LoginAsync(User loginModel)
        {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginModel.UserName);
        }


    }
}
