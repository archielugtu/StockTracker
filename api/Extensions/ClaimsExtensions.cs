using System.Security.Claims;

namespace api.Extensions
{
    public static class ClaimsExtensions
    {
        // ClaimsPrincipal extension method to get the username from the JWT token claims
        public static string GetUsername(this ClaimsPrincipal user)
        {
            // URL is how you reach into the claims
            // We get the claims from the TokenService.CreateToken() where it was added
            return user.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")).Value;
        }
    }
}
