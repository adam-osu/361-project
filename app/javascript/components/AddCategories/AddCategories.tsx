import React from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { CategoryForm } from "../../shared/components/CategoryForm";

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

  if (data) {
    return <Redirect to="/categories" />;
  }

  const onSubmit = async ({ id, name, description }) => {
    await createCategory({ variables: { id, name, description } });
  };

  return (
    <>
      <h1>Add Categories</h1>
      <CategoryForm handleSubmit={onSubmit} />
    </>
  );
};
