using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<RegisterModel, User>()
            .ForMember(x => x.Email, opt => opt.MapFrom(c => c.Email))
            .ForMember(x => x.UserName, opt => opt.MapFrom(c => c.FirstName));

        CreateMap<LoginModel, User>();

        CreateMap<CreateOrderModel, Order>();
    }
}
