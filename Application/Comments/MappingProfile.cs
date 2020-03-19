using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.Username, cfg => cfg.MapFrom(src => src.Author.UserName))
                .ForMember(dest => dest.DisplayName, cfg => cfg.MapFrom(src => src.Author.DisplayName))
                .ForMember(dest => dest.Image, cfg => cfg.MapFrom(src => src.Author.Photos.Where(p => p.IsMain)));
        }
    }
}