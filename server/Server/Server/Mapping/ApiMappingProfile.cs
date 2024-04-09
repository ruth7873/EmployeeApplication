using AutoMapper;
using Server.API.Model;
using Server.Core.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Server.API.Mapping
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
            CreateMap<EmployeeRolePostModel, EmployeeRole>().ReverseMap();
            CreateMap<UserPostModel, User>().ReverseMap();
            CreateMap<LoginModel,User>().ReverseMap();
        }
    }
}
