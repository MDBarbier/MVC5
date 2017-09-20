using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mappingTestApp.Models
{
    public class GamesDAL
    {

        //Instance variables & properties

        private static GamesEntities _db;

        private static GamesEntities Db {
            get {
                return _db ?? (_db = new GamesEntities());
            }
        }

        //Methods

        public static IEnumerable<Game> GetGames()
        {
            var query = from games in Db.Games select games;

            return query.ToList();
        }

        public static void InsertGame(Game game)
        {
            Db.Games.Add(game);
            Db.SaveChanges();
        }

        public static void DeleteGame(int gameId)
        {
            var deleteItem = Db.Games.FirstOrDefault(c => c.Id == gameId);

            if (deleteItem != null)
            {
                Db.Games.Remove(deleteItem);
                Db.SaveChanges();
            }
        }
    }
}