using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace songService.Models
{
    public class Song
    {
        public int Id { get; set; }

        [Required]
        public string User { get; set; }

        public string CoverArt { get; set; }

        [Required(ErrorMessage = "Song title is required")]
        [StringLength(100, ErrorMessage = "Title must be less than 100 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Song artiste is required")]
        [StringLength(100, ErrorMessage = "Artiste must be less than 100 characters")]
        public string Artiste { get; set; }

        [Required(ErrorMessage = "Song lyrics is required")]
        [Column(TypeName = "ntext")]
        public string Lyrics { get; set; }

        [StringLength(30)]
        public string Genre { get; set; }
    }
}
