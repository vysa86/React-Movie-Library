const API_KEY="e3c73c8e6ab828d1bd896aaf2fd7cbde";
const API_URL = "https://api.themoviedb.org/3";
const API_URL_IMAGE = "https://image.tmdb.org/t/p/w500";
const API_URL_SEARCH = `${API_URL}/search/movie?api_key=${API_KEY}&query=`; 

export const getPopularMovies= async () => {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    return data.results;
}
export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${API_URL_SEARCH}${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error("Failed to search movies");
    }
    const data = await response.json();
    return data.results;
}
