import { Suspense, useEffect, useRef, useState } from "react";
import { fetchMovieById } from "../../movies-api";
import clsx from "clsx";

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import css from "./MovieDetailPage.module.css";

const getLinkCss = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/movies");
  // const backLink = location.state ?? "/";
  console.log(location);

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  return (
    <>
      {loading && <b>Loading Film Details.....</b>}
      {movieDetails && (
        <div>
          <button className={css.btn}>
            <Link to={backLinkRef.current}>Go back</Link>
          </button>
          <div className={css.container}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : defaultImg
              }
              width={250}
              alt={movieDetails.title}
            />
            <div className={css.descr}>
              <h1>{movieDetails.original_title}</h1>
              <p>{movieDetails.release_data}</p>
              <p className={css.subtitle}>
                <b>{movieDetails.release_date.slice(0, 4)}</b>
              </p>
              <p>
                <b className={css.subtitle}>User Score: </b>{" "}
                {Math.round(movieDetails.vote_average * 10)}%
              </p>
              <p>
                <b className={css.subtitle}>Overview: </b>
                {movieDetails.overview}
              </p>
              <p>
                <b className={css.subtitle}>Genres: </b>
                {movieDetails.genres.map((genre) => genre.name)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* рендерить вкладену навігацію до мартшрутів /movies/:movieId/cast та  /movies/:movieId/reviews*/}

      <ul className={css.list}>
        <li className={css.link}>
          <NavLink className={getLinkCss} to="cast">
            MovieCast
          </NavLink>
        </li>
        <li>
          <NavLink className={getLinkCss} to="reviews">
            MovieReviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading more...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailPage;
