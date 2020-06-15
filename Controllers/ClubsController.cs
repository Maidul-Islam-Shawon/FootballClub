using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballClub.Models;

namespace FootballClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubsController : ControllerBase
    {
        private readonly FootballClubContext _context;

        public ClubsController(FootballClubContext context)
        {
            _context = context;
        }

        // GET: api/Clubs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Club>>> GetClub()
        {
            var clubs = _context.Club.Select(x =>
                    new Club
                    {
                        ClubId=x.ClubId,
                        ClubName=x.ClubName,
                        AddressLine1=x.AddressLine1,
                        Postcode=x.Postcode,
                        Town=x.Town,
                        ClubMembers=x.ClubMembers
                    }
                );

            return await clubs.ToListAsync();
        }

        // GET: api/Clubs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Club>> GetClub(int id)
        {
            var club =await _context.Club.Select(x =>
                    new Club()
                    {
                        ClubId = x.ClubId,
                        ClubName = x.ClubName,
                        AddressLine1 = x.AddressLine1,
                        Postcode = x.Postcode,
                        Town = x.Town,
                        ClubMembers = x.ClubMembers
                    }).Where(y=>y.ClubId==id).FirstOrDefaultAsync();

            if (club == null)
            {
                return NotFound();
            }

            return club;
        }

        // PUT: api/Clubs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClub(int id, Club club)
        {
            if (id != club.ClubId)
            {
                return BadRequest();
            }

            _context.Entry(club).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClubExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Clubs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Club>> PostClub(Club club)
        {
            _context.Club.Add(club);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClub", new { id = club.ClubId }, club);
        }

        // DELETE: api/Clubs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Club>> DeleteClub(int id)
        {
            var club = await _context.Club.FindAsync(id);
            if (club == null)
            {
                return NotFound();
            }

            _context.Club.Remove(club);
            await _context.SaveChangesAsync();

            return club;
        }

        private bool ClubExists(int id)
        {
            return _context.Club.Any(e => e.ClubId == id);
        }
    }
}
