using Server.Core.Entities;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service
{
    public class AuthService:IAuthService
    {
        private readonly IAuthRepository _authRepository;
        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<User> LoginAsunc(User loginModel)
        {
            return await  _authRepository.LoginAsync(loginModel);
        }
    }

}
