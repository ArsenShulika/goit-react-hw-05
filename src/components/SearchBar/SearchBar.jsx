import { Field, Form, Formik } from "formik";

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
          type="text"
          name="query"
          placeholder="Search movies.."
          autoComplete="off"
          autoFocus
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
