using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FootballClub.Models
{
    public class ClubMembers
    {
        [Key]
        public int MemberId { get; set; }

        [Required]
        public string Forename { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }


        public int? ClubId { get; set; }
        public Club Club { get; set; }
    }
}
