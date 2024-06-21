import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2IyZTBhNGQzYzgyZGJkYmY5ODRmYTBjZjhlMDdjMyIsInN1YiI6IjY2NmFhZDVjNjFhMDA4N2NmYjc2MTFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SSzExRebryGEcihx9rCDM0mkDs9Izs2tP2qLmlCUNso",
  },
};

const getTrandingMovies = async () => {
  const response = await axios.get("3/trending/movie/day", options);
  return response.data;
};

const fetchMovieById = async (movieId) => {
  const response = await axios.get(`3/movie/${movieId}`, options);
  return response.data;
};

const getSearchMovie = async (query) => {
  const response = await axios.get(`3/search/movie?query=${query}`, options);
  return response.data;
};

const getMovieCast = async (movieId) => {
  const response = await axios.get(`3/movie/${movieId}/credits`, options);
  return response.data;
};

const getReviews = async (movieId) => {
  const response = await axios.get(`3/movie/${movieId}/reviews`, options);
  return response.data;
};

export {
  getTrandingMovies,
  fetchMovieById,
  getSearchMovie,
  getMovieCast,
  getReviews,
};
