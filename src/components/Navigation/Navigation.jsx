import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const getLinkCss = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav>
      <ul className={css.container}>
        <li>
          <NavLink to="/" className={getLinkCss}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={getLinkCss}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
