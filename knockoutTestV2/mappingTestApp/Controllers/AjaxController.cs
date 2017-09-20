using mappingTestApp.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace mappingTestApp.Controllers
{
    public class AjaxController : ApiController
    {
        // GET: api/Ajax
        public IEnumerable<Game> Get()
        {
            return GamesDAL.GetGames();
        }

        // GET: api/Ajax
        public Game Get(int id)
        {
            return GamesDAL.GetGames().Where(g => g.Id == id).FirstOrDefault();
        }

        // POST: api/Ajax
        public HttpResponseMessage Post(Game game)
        {
            GamesDAL.InsertGame(game);
            var response = Request.CreateResponse(HttpStatusCode.Created, game);
            var url = Url.Link("DefaultApi", new { game.Id });
            response.Headers.Location = new Uri(url);
            return response;
        }
                
        // DELETE: api/Ajax/5
        public HttpResponseMessage Delete(int id)
        {
            GamesDAL.DeleteGame(id);
            var response = Request.CreateResponse(HttpStatusCode.OK, id);
            return response;
        }
    }
}
