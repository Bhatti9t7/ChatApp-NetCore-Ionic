using System.Reflection.Metadata;
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
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;

        public ContactsController(ApplicationDbcontext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<IEnumerable<Contact>> Getcontacts()
        {
            return await _context.contacts.ToListAsync();
        }
       
        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<Contact> GetContact(int id)
        {
            var contact = await _context.contacts.FindAsync(id);
            return contact;
        }

        [HttpGet("filter/user/other/{id}")]
        public async Task<IEnumerable<User>> GetcontactsByUserIdOther(int id)
        {            
            var users = await _context.users.Where(m=>m.id!=id).ToListAsync();
            var contacts = await _context.contacts.Where(m=>m.userId==id).ToListAsync();
            
            foreach (var contact in contacts)
            {
                var userIndex=users.FindIndex(u=>u.id==contact.contactUserId);
                if(userIndex>-1)
                {
                    users.RemoveAt(userIndex);     
                }           
            }
            return users;
        }

        [HttpGet("filter/user/{id}")]
        public async Task<IEnumerable<Contact>> GetcontactsByUserId(int id)
        {            
            var contacts = await _context.contacts.Where(m=>m.userId==id).ToListAsync();
            return contacts;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.id)
            {
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
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

        // POST: api/Contacts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<Contact> PostContact(Contact contact)
        {
            _context.contacts.Add(contact);
            await _context.SaveChangesAsync();

            return contact;
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<Contact> DeleteContact(int id)
        {
            var contact = await _context.contacts.FindAsync(id);
            if (contact == null)
            {
                return null;
            }

            _context.contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return contact;
        }

        private bool ContactExists(int id)
        {
            return _context.contacts.Any(e => e.id == id);
        }
    }
}
