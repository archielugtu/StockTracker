using api.Dto.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        // Offered by AspNetCore.Identity to remove overhead of rewriting user authentication/authorization logic
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid) 
                    return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                IdentityResult createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);
                if (createdUser.Succeeded)
                {
                    // Similar to _userManager.CreateAsync. Pass in the role we want to assign to user on register.
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    else
                        return StatusCode(500, roleResult.Errors); // or can also return BadRequest
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            } 
            catch (Exception ex)
            {
                return StatusCode(500, ex); // any other exceptions will be caught here
            }
        }
    }
}
