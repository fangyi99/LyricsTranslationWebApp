using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using songService.Data;
using songService.Models;

namespace songService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly songServiceContext _context;

        public SongsController(songServiceContext context)
        {
            _context = context;
        }

        // GET: api/Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetAllSongs([FromQuery] QueryParameters queryParameters)
        {
            IQueryable<Song> songs = _context.Song;

            if (!string.IsNullOrEmpty(queryParameters.Title))
            {
                songs = songs.Where(
                s => s.Title.ToLower().Contains(queryParameters.Title.ToLower()));
            }

            if (!string.IsNullOrEmpty(queryParameters.Genre))
            {
                songs = songs.Where(s => s.Genre.ToLower().Contains(queryParameters.Genre.ToLower()));
            }

            if (!songs.Any())
            {
                return NotFound(new { Status = "Error", Message = "No matches found" });
            }

            return await songs.ToListAsync();
        }

        // GET: api/Songs
        [HttpGet]
        [Route("user-songs/{user}")]
        public async Task<ActionResult<IEnumerable<Song>>> GetUserSongs(string user)
        {

            IQueryable<Song> songs = _context.Song;

            if (!string.IsNullOrEmpty(user))
            {
                songs = songs.Where(s => s.User.ToLower().Equals(user.ToLower()));
            }

            if (!songs.Any())
            {
                return NotFound(new { Status = "Error", Message = "No songs created" });
            }

            return await songs.ToListAsync();
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(int id)
        {
            var song = await _context.Song.FindAsync(id);

            if (song == null)
            {
                return NotFound(new { Status = "Error", Message = "Song Id does not exist" });
            }

            return song;
        }

        // PUT: api/Songs/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Song>> EditSong(int id, Song song)
        {
            var editedSong = await _context.Song.FindAsync(id);

            if (editedSong == null)
            {
                return NotFound(new { Status = "Error", Message = "Song Id does not exist" });
            }

            try
            {
                editedSong.Id = id;
                editedSong.User = song.User;
                editedSong.CoverArt = song.CoverArt;
                editedSong.Title = song.Title;
                editedSong.Artiste = song.Artiste;
                editedSong.Lyrics = song.Lyrics;
                editedSong.Genre = song.Genre;

                _context.Entry(editedSong).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { Status = "Success", Message = "Song updated successfully" });
            }
            catch
            {
                return NotFound(new { Status = "Error", Message = "Update failed" });
            }
        }

        // POST: api/Songs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Song>> PostSong(Song song)
        {
            _context.Song.Add(song);
            await _context.SaveChangesAsync();

            return Ok(new { Status = "Success", Message = "Creation successful", SongDetails = song });
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Song>> DeleteSong(int id)
        {
            var song = await _context.Song.FindAsync(id);
            if (song == null)
            {
                return NotFound(new { Status = "Error", Message = "Song Id does not exist" });
            }

            _context.Song.Remove(song);
            await _context.SaveChangesAsync();

            return Ok(new { Status = "Success", Message = "Song deleted successfully" });
        }

        private bool SongExists(int id)
        {
            return _context.Song.Any(e => e.Id == id);
        }
    }
}
