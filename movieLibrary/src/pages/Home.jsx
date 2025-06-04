import "../css/Home.css";
import Moviecard from "../componenets/MovieCard";
import { useState,useEffect } from "react";

import { searchMovies,getPopularMovies } from "../services/api";  

// This component is used to display the home page of the movie library, showing a grid of movie cards.

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      setError("Failed to fetch popular movies. Please try again later.");
    }
    finally {
      setLoading(false);
    }
  };
  loadPopularMovies();
},[])
function handleSearch(e) {  
    e.preventDefault();
    if (!searchQuery.trim()) {
     
      return;
    }
    if(loading) return;

    setLoading(true);
    try {
      searchMovies(searchQuery)
        .then((results) => {
          setMovies(results);
          setError(null);
        })
        .catch((error) => {
          console.error("Failed to search movies:", error);
          setError("Failed to search movies. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error during search:", error);
      setError("An error occurred while searching. Please try again later.");
      setLoading(false);
    }
}
return (
  <div className="home">
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
         
      />
      <button type="submit" className="search-button">Search</button>
    </form>
    {error && <div className="error">{error}</div>}
    {loading ? (<div className="loading">Loading movies...</div>):(<div className="movies-grid">
      {movies.map((movie) => (
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&    
        <Moviecard key={movie.id} movie={movie} />
      ))}
    </div>)}
    
  </div>
);
}

export default Home;
// This component is used to display the home page of the movie library, showing a grid of movie cards.