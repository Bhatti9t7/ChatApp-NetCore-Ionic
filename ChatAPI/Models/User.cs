using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; 
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.Models
{
    public class User
    {   
        [Key]
        public int id { get; set; }
		public string countryCode {get;set;}
        public string phoneNumber { get; set; }
        public string name { get; set; }
        public string description { get; set; }
		public string image { get; set; }
    }
}
