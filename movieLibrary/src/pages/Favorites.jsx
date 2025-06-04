import "../css/favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import Moviecard from "../componenets/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites.length > 0) {
    return (
      <div>
        <h2 className="favorites">Your Favourites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <Moviecard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No favorites movies yet</h2>
      <p>Start adding movies to your favorites!</p>
    </div>
  );
}
export default Favorites;
// This component is used to display the favorites page of the movie library, showing a message when there are no favorite movies.
