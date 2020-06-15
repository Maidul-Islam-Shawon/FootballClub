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
    public class ClubMembersController : ControllerBase
    {
        private readonly FootballClubContext _context;

        public ClubMembersController(FootballClubContext context)
        {
            _context = context;
        }

        // GET: api/ClubMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClubMembers>>> GetClubMembers()
        {
            var clubMembers = _context.ClubMembers.Select(x =>
                            new ClubMembers()
                            {
                                MemberId=x.MemberId,
                                Forename=x.Forename,
                                Surname=x.Surname,
                                EmailAddress=x.EmailAddress,
                                ClubId=x.ClubId,
                                Club=x.Club
                            }

                        );

            return await clubMembers.ToListAsync();
        }

        // GET: api/ClubMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClubMembers>> GetClubMembers(int id)
        {
            var clubMembers = await _context.ClubMembers.FindAsync(id);

            if (clubMembers == null)
            {
                return NotFound();
            }

            return clubMembers;
        }

        // PUT: api/ClubMembers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClubMembers(int id, ClubMembers clubMembers)
        {
            if (id != clubMembers.MemberId)
            {
                return BadRequest();
            }

            _context.Entry(clubMembers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClubMembersExists(id))
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

        // POST: api/ClubMembers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ClubMembers>> PostClubMembers(ClubMembers clubMembers)
        {
            _context.ClubMembers.Add(clubMembers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClubMembers", new { id = clubMembers.MemberId }, clubMembers);
        }

        // DELETE: api/ClubMembers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClubMembers>> DeleteClubMembers(int id)
        {
            var clubMembers = await _context.ClubMembers.FindAsync(id);
            if (clubMembers == null)
            {
                return NotFound();
            }

            _context.ClubMembers.Remove(clubMembers);
            await _context.SaveChangesAsync();

            return clubMembers;
        }

        private bool ClubMembersExists(int id)
        {
            return _context.ClubMembers.Any(e => e.MemberId == id);
        }
    }
}
