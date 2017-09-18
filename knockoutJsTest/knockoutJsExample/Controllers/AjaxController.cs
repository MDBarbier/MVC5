using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace knockoutJsExample.Controllers
{
    public class AjaxController : ApiController
    {
        // GET: api/API
        public IEnumerable<string> Get()
        {
            return new string[] { "test successful" };
        }
        
        // POST: api/API
        public string Post(JObject value)
        {
            string rv = "Hello " + value["lastName"].ToString();
            return rv;
        }

        
    }
}
