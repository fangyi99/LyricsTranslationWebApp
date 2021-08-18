using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using songService.Models;

namespace songService.Data
{
    public class songServiceContext : DbContext
    {
        public songServiceContext (DbContextOptions<songServiceContext> options)
            : base(options)
        {
        }

        public DbSet<songService.Models.Song> Song { get; set; }
    }
}
