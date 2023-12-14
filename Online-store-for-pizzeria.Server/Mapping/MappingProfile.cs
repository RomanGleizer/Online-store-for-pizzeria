using AutoMapper;
using Online_store_for_pizzeria.Server.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateOrderModel, Order>()
            .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
            .ReverseMap();

        CreateMap<UserViewModel, User>()
            .ReverseMap();

        CreateMap<PizzaViewModel, Pizza>()
            .ReverseMap();

        CreateMap<RegisterViewModel, User>();
    }
}
