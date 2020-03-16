using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>()
                .ForMember(
                    dest => dest.Attendees,
                    member => member.MapFrom(a => a.UserActivities)
                );
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(
                    dest => dest.Username,
                    member => member.MapFrom(u => u.AppUser.UserName)
                )
                .ForMember(
                    dest => dest.DisplayName,
                    member => member.MapFrom(u => u.AppUser.DisplayName)
                )
                .ForMember(
                    dest => dest.Image,
                    member => member.MapFrom(
                        u => u.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url
                    )
                );
        }
    }
}