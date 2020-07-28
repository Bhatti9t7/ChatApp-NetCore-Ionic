using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; 
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.Models
{
    public class Conversation
    {   
        [Key]
        public int id { get; set; }
		public int userId {get;set;}
		public int contactId {get;set;}
    }
}
