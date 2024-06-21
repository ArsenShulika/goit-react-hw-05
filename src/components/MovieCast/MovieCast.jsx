import { useEffect, useState } from "react";
import { getMovieCast } from "../../movies-api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [casts, setCasts] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        setCasts(data.cast);
        // console.log(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {loading && <b>Loading CastDetails...</b>}
      <ul className={css.list}>
        {casts.length > 0 &&
          casts.map((cast) => (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                    : defaultImg
                }
                width={250}
                alt={cast.name}
              />
              <p>{cast.original_name}</p>
              <p>{cast.character}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
