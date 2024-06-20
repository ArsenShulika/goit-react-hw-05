import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <h3>
        Sorrt, page not found! Please go to{" "}
        <Link to="/" className={css.link}>
          Go to home page!
        </Link>
      </h3>
    </div>
  );
}
