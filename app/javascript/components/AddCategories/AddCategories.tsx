import React from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!, $description: String) {
    createCategory(name: $name, description: $description) {
      name
      description
    }
  }
`;

export const AddCategories = () => {
  const [createCategory, { data, loading, error }] =
    useMutation(CREATE_CATEGORY);

  const nameRef = React.useRef();
  const descriptionRef = React.useRef();

  if (data) {
    return <Redirect to="/categories" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef?.current?.value ?? "";
    const description = descriptionRef?.current?.value ?? "";

    await createCategory({ variables: { name, description } });
  };

  return (
    <>
      <h1>Add Categories</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} name="name" type="text" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input ref={descriptionRef} name="description" type="text" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
