using System.Net.Http;
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
    public class MessagesController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;

        public MessagesController(ApplicationDbcontext context)
        {
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<IEnumerable<Message>> Getmessages()
        {
            return await _context.messages.ToListAsync();
        }
       
        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<Message> GetMessage(int id)
        {
            var message = await _context.messages.FindAsync(id);
            return message;
        }
        [HttpGet("filter/conversation/{id}")]
        public async Task<IEnumerable<Message>> GetByconversationId(int id)
        {            
            var messages = await _context.messages.Where(m=>m.conversationId==id).ToListAsync();
            return messages;
        }
        [HttpGet("filter/conversation/{id}/last")]
        public async Task<IActionResult> GetByconversationIdLast(int id)
        {            
            var messages = await _context.messages.Where(m=>m.conversationId==id).ToListAsync();
            if(messages.Count>0){
                return Ok(messages[messages.Count-1]);
            }
            return NotFound();
        }

        [HttpGet("filter/sender/{id}")]
        public async Task<IEnumerable<Message>> GetBysenderId(int id)
        {            
            var messages = await _context.messages.Where(m=>m.senderId==id).ToListAsync();
            return messages;
        }

        [HttpGet("filter/receiver/{id}")]
        public async Task<IEnumerable<Message>> GetByreceiverId(int id)
        {            
            var messages = await _context.messages.Where(m=>m.receiverId==id).ToListAsync();
            return messages;
        }

        // PUT: api/Messages/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(int id, Message message)
        {
            if (id != message.id)
            {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
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

        // POST: api/Messages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<Message> PostMessage(Message message)
        {
            _context.messages.Add(message);
            await _context.SaveChangesAsync();

            return message;
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<Message> DeleteMessage(int id)
        {
            var message = await _context.messages.FindAsync(id);
            if (message == null)
            {
                return null;
            }

            _context.messages.Remove(message);
            await _context.SaveChangesAsync();

            return message;
        }

        private bool MessageExists(int id)
        {
            return _context.messages.Any(e => e.id == id);
        }
    }
}
