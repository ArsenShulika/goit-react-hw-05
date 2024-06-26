import { useEffect, useState } from "react";
import { getTrandingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrandingMovies()
      .then((data) => setMovies(data.results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {loading && <b>Loading movies</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
