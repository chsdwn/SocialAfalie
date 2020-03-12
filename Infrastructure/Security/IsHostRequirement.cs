using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dbContext;

        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext dbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            IsHostRequirement requirement)
        {
            if(context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = _httpContextAccessor
                    .HttpContext.User?.Claims?.SingleOrDefault(
                        c => c.Type == ClaimTypes.NameIdentifier
                    )?.Value;

                var activityId = Guid.Parse(authContext.RouteData.Values["id"].ToString());

                var activity = _dbContext.Activities.FindAsync(activityId).Result;

                var host = activity.UserActivities.FirstOrDefault(u => u.IsHost);

                if(host?.AppUser?.UserName == currentUserName)
                    context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}