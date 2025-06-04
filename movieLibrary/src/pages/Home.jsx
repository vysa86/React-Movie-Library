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
    const [page, setPage] = useState(1);

useEffect(() => {
  const loadPopularMovies = async () => {
    try {
      
      const popularMovies = await getPopularMovies(page);
      
            setMovies(prev=>{
              const existingIds = new Set(prev.map(m => m.id));
              const newMovies = popularMovies.filter(m => !existingIds.has(m.id));
              return [...prev,...newMovies]
            });
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      setError("Failed to fetch popular movies. Please try again later.");
    }
    finally {
      setLoading(false);
    }
  };
  loadPopularMovies();
},[page])
useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      setPage(prev => prev + 1);  // Trigger next page load
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [loading]);
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