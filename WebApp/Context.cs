using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApp
{
    public sealed class Context : DbContext
    {
        public DbSet<Guest> Guest { get; set; }
        public DbSet<Employee> Employee { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) => modelBuilder.UseIdentityAlwaysColumns();
    }
}
