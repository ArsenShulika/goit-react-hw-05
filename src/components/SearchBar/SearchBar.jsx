import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (values.query === "") {
          return;
        }
        onSearch(values.query);
        values.query = "";
        actions.resetForm;
      }}
    >
      <Form>
        <Field
          className={css.input}
          type="text"
          name="query"
          placeholder="Search movies.."
          autoComplete="off"
          autoFocus
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}
