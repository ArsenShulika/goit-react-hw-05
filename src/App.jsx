import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";
import css from "../src/App.module.css";

const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../src/pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../src/pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../src/pages/NotFoundPage/NotFoundPage")
);
const MovieCast = lazy(() => import("../src/components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../src/components/MovieReviews/MovieReviews")
);

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
