using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class AttendeeDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool IsHost { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UserActivity, AttendeeDto>();
        }
    }
}