using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; 
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.Models
{
    public class Message
    {   
        [Key]
        public int id { get; set; }
		public int conversationId {get;set;}
		public int senderId {get;set;}
		public int receiverId {get;set;}
		public string message {get;set;}
		public DateTime date {get;set;}
    }
}
