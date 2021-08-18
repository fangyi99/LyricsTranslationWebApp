using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using accountService.Models;
using accountService.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace accountService.Data
{
    public class accountServiceContext : IdentityDbContext<ApplicationUser>
    {
        public accountServiceContext (DbContextOptions<accountServiceContext> options)
            : base(options)
        {
        }

        public DbSet<accountService.Models.Account> Account { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Account>()
                .Property(account => account.Role).HasDefaultValue("User");
        }

    }

}
