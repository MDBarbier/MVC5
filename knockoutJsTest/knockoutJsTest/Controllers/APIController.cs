using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using knockoutJsTest.Models;

namespace knockoutJsTest.Controllers
{
    public class APIController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<GamesTable> Get()
        {
            return testDataDAL.GetGames();
        }

        // GET api/<controller>/5
        public GamesTable Get(int id)
        {
            return testDataDAL.GetGames().FirstOrDefault(g => g.Id == id);
        }

        // POST api/<controller>
        public HttpResponseMessage Post(GamesTable game)
        {
            testDataDAL.InsertGame(game);
            var response = Request.CreateResponse(HttpStatusCode.Created, game);
            var url = Url.Link("DefaultApi", new { game.Id });
            response.Headers.Location = new Uri(url);
            return response;
        }
               
        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id)
        {
            testDataDAL.DeleteGame(id);
            var response = Request.CreateResponse(HttpStatusCode.OK, id);
            return response;
        }
    }
}