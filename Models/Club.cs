using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FootballClub.Models
{
    public class Club
    {
        [Key]
        public int ClubId { get; set; }

        [Required]
        public string ClubName { get; set; }

        [Required]
        public string AddressLine1 { get; set; }

        [Required]
        public string Town { get; set; }

        public string Postcode { get; set; }


        public ICollection<ClubMembers> ClubMembers { get; set; }
    }
}
