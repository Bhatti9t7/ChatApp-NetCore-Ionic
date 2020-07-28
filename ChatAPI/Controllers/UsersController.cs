using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatAPI.Models;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;

        public UsersController(ApplicationDbcontext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<User>> Getusers()
        {
            return await _context.users.ToListAsync();
        }
       
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<User> GetUser(int id)
        {
            var user = await _context.users.FindAsync(id);
            return user;
        }

        [HttpGet("filter/phoneno")]
        public async Task<IActionResult> GetUserByPhoneNumber([FromQuery] string countryCode,[FromQuery] string phoneNumber)
        {
            var user = await _context.users.Where(m=>m.countryCode==countryCode&&m.phoneNumber==phoneNumber).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

         [HttpGet("filter/otheruser/{id}")]
        public async Task<IActionResult> GetUserByPhoneNumber(int id)
        {
            var user = await _context.users.Where(m=>m.id!=id).ToListAsync();
            return Ok(user);
        }
        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<User> PostUser(User user)
        {
            _context.users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<User> DeleteUser(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            _context.users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.users.Any(e => e.id == id);
        }
    }
}
