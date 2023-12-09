using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateOrderViewModel, Order>()
            .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
            .ReverseMap();

        CreateMap<UserViewModel, User>()
            .ReverseMap();

        CreateMap<PizzaViewModel, Pizza>()
            .ReverseMap();

        CreateMap<RegisterViewModel, User>();
    }
}
