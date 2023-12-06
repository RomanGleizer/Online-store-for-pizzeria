using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<OrderViewModel, Order>()
            .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
            .ReverseMap();

        CreateMap<CustomerViewModel, Customer>()
            .ReverseMap();

        CreateMap<PizzaViewModel, Pizza>()
            .ReverseMap();

        CreateMap<RegisterViewModel, User>()
            .ReverseMap();
    }
}
