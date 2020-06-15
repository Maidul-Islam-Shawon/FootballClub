using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FootballClub.Models;

namespace FootballClub.Models
{
    public class FootballClubContext : DbContext
    {
        public FootballClubContext (DbContextOptions<FootballClubContext> options)
            : base(options)
        {
        }

        public DbSet<FootballClub.Models.Club> Club { get; set; }

        public DbSet<FootballClub.Models.ClubMembers> ClubMembers { get; set; }
    }
}
