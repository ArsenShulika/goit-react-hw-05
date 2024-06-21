import { useParams } from "react-router-dom";
import { getReviews } from "../../movies-api";
import { useEffect, useState } from "react";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const data = await getReviews(movieId);
        setMovieReviews(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      {loading && <b>Loading Movie reviews...</b>}
      <ul>
        {movieReviews.length > 0 &&
          movieReviews.map((movieReview) => (
            <li key={movieReview.id}>
              <h2>{movieReview.author}</h2>
              <p>{movieReview.content}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
