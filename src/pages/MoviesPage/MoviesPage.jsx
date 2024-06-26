import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getSearchMovie } from "../../movies-api";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [dataMovies, setDataMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const queryMovie = searchParam.get("query") ?? "";

  useEffect(() => {
    async function fetchMovies() {
      if (queryMovie === "") {
        return;
      }
      try {
        setIsLoader(true);
        const data = await getSearchMovie(queryMovie);
        console.log(data);
        setDataMovies(data.results);
      } catch (error) {
        console.log(error);
        // setIsError(true);
      } finally {
        setIsLoader(false);
      }
    }
    fetchMovies();
  }, [queryMovie]);

  const handleSearch = async (queryMovie) => {
    searchParam.set("query", queryMovie);
    setSearchParam(searchParam);
    setDataMovies([]);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isLoader && <b>Movie is loading...</b>}
      {dataMovies.length > 0 && <MovieList movies={dataMovies} />}
    </div>
  );
}
