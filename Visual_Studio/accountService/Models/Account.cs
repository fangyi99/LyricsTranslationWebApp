using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace accountService.Models
{
    public class Account
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(30, ErrorMessage = "Username must be less than 30 characters")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(30, ErrorMessage = "Password must be less than 30 characters.")]
        public string Password { get; set; }


        [EmailAddress]
        [DataType(DataType.EmailAddress, ErrorMessage = "Invalid email address")]
        [StringLength(50)]
        public string Email { get; set; }

    }
}
