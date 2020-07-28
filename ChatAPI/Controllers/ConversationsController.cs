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
    public class ConversationsController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;

        public ConversationsController(ApplicationDbcontext context)
        {
            _context = context;
        }

        // GET: api/Conversations
        [HttpGet]
        public async Task<IEnumerable<Conversation>> Getconversations()
        {
            return await _context.conversations.ToListAsync();
        }
       
        // GET: api/Conversations/5
        [HttpGet("{id}")]
        public async Task<Conversation> GetConversation(int id)
        {
            var conversation = await _context.conversations.FindAsync(id);
            return conversation;
        }

        [HttpGet("filter/user/{id}")]
        public async Task<IEnumerable<Conversation>> GetByUserId(int id)
        {            
            var conversations = await _context.conversations.Where(m=>m.userId==id||m.contactId==id).ToListAsync();
            return conversations;
        }
         [HttpGet("filter/contact/{id}")]
        public async Task<IEnumerable<Conversation>> GetByContactId(int id)
        {
            var conversations = await _context.conversations.Where(m=>m.contactId==id).ToListAsync();
            return conversations;
        }
        // PUT: api/Conversations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConversation(int id, Conversation conversation)
        {
            if (id != conversation.id)
            {
                return BadRequest();
            }

            _context.Entry(conversation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConversationExists(id))
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

        // POST: api/Conversations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<Conversation> PostConversation(Conversation conversation)
        {
            _context.conversations.Add(conversation);
            await _context.SaveChangesAsync();

            return conversation;
        }

        // DELETE: api/Conversations/5
        [HttpDelete("{id}")]
        public async Task<Conversation> DeleteConversation(int id)
        {
            var conversation = await _context.conversations.FindAsync(id);
            if (conversation == null)
            {
                return null;
            }

            _context.conversations.Remove(conversation);
            await _context.SaveChangesAsync();

            return conversation;
        }

        private bool ConversationExists(int id)
        {
            return _context.conversations.Any(e => e.id == id);
        }
    }
}
