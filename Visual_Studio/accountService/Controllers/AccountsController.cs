using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using accountService.Data;
using accountService.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using accountService.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace accountService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly accountServiceContext _context;
        private readonly IConfiguration _configuration;

        public AccountsController(accountServiceContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts()
        {
            return await _context.Account.ToListAsync();
        }

        // GET: api/Accounts/username
        [HttpGet("{username}")]
        public async Task<ActionResult<Account>> GetAccount(string username)
        {
            var account = await _context.Account.SingleAsync(a => a.Username == username);

            if (account == null)
            {
                return NotFound(new { Status = "Error", Message = "Account is not valid" });
            }

            return account;
        }

        // PUT: api/Accounts/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Account>> EditAccount(int id, Account account)
        {
            var editedAccount = await _context.Account.FindAsync(id);

            if (editedAccount == null)
            {
                return NotFound(new { Status = "Error", Message = "Account Id does not exist" });
            }

            try
            {
                if(account.Email == null)
                {
                    editedAccount.Id = id;
                    editedAccount.Role = account.Role;
                    editedAccount.Username = account.Username;
                    editedAccount.Password = account.Password;
                    editedAccount.Email = "";
                }
                
                else
                {
                    editedAccount.Id = id;
                    editedAccount.Role = account.Role;
                    editedAccount.Username = account.Username;
                    editedAccount.Password = account.Password;
                    editedAccount.Email = account.Email;
                }
                
                _context.Entry(editedAccount).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { Status = "Success", Message = "Profile updated successfully" });
            }
            catch
            {
                return NotFound(new { Status = "Error", Message = "Update failed" });
            }
        }

        // POST: api/Accounts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<Account>> Register(Account account)
        {

            if (_context.Account.Where(a => a.Username == account.Username).Any())
            {
                return BadRequest(new { Status = "Error", Message = "Username is taken" });
            }

            if(account.Email == null)
            {
                account.Role = account.Role;
                account.Username = account.Username;
                account.Password = account.Password;
                account.Email = "";
            }

                _context.Account.Add(account);
                await _context.SaveChangesAsync();

                return Ok(new { Status = "Success", Message = "Registeration successful", AccountDetails = account });
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> DeleteAccount(int id)
        {
            var account = await _context.Account.FindAsync(id);
            if (account == null)
            {
                return NotFound(new { Status = "Error", Message = "Account Id does not exist" });
            }

            _context.Account.Remove(account);
            await _context.SaveChangesAsync();

            return Ok(new { Status = "Success", Message = "Account deleted successfully" });
        }

        private bool AccountExists(int id)
        {
            return _context.Account.Any(e => e.Id == id);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(Login model)
        {
            var account = await _context.Account.SingleAsync(a => a.Username == model.Username);

            if (account == null)
            {
                return NotFound(new { Status = "Error", Message = "Invalid username" });
            }
            if (model.Password == account.Password)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: "JWT:ValidIssuer",
                    audience: "JWT:ValidAudience",
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    message = "Login successful",
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    accountDetails = GetAccount(model.Username)
                });
            }
            return Unauthorized(new { Status = "Error", Message = "Incorrect username or password" });
        }
    }
}
