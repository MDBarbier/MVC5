using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace knockoutJsTest.Models
{
    public class testDataDAL
    {
        private static testDataEntities _gameDb;
        private static testDataEntities GameDb
        {
            get { return _gameDb ?? (_gameDb = new testDataEntities()); }
        }

        /// <summary>
        /// Gets the games.
        /// </summary>
        /// <returns>IEnumerable Game List</returns>
        public static IEnumerable<GamesTable> GetGames()
        {
            var query = from games in GameDb.GamesTables select games;
            return query.ToList();
        }

        /// <summary>
        /// Inserts the game to database.
        /// </summary>
        /// <param name="game">The game object to insert.</param>
        public static void InsertGame(GamesTable game)
        {
            GameDb.GamesTables.Add(game);
            GameDb.SaveChanges();
        }

        /// <summary>
        /// Deletes game from database.
        /// </summary>
        /// <param name="gameId">Game ID</param>
        public static void DeleteGame(int gameId)
        {
            var deleteItem = GameDb.GamesTables.FirstOrDefault(c => c.Id == gameId);

            if (deleteItem != null)
            {
                GameDb.GamesTables.Remove(deleteItem);
                GameDb.SaveChanges();
            }
        }
    }
}