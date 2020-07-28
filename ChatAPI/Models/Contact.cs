using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; 
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.Models
{
    public class Contact
    {   
        [Key]
        public int id { get; set; }
		public int userId {get;set;}
		public int contactUserId {get;set;}
    }
}
