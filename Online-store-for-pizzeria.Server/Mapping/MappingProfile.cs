using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<RegisterModel, User>();
        CreateMap<LoginModel, User>();
        CreateMap<CreateOrderModel, Order>();
    }
}
