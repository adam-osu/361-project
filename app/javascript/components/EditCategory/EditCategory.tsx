import React from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { CategoryForm } from "../../shared/components/CategoryForm";

const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $name: String, $description: String) {
    updateCategory(id: $id, name: $name, description: $description) {
      status
    }
  }
`;

export const EditCategory = () => {
  const [updateCategory, { data, loading, error }] =
    useMutation(UPDATE_CATEGORY);

  const onSubmit = async ({ id, name, description }) => {
    await updateCategory({ variables: { id, name, description } });
  };

  if (data) {
    return <Redirect to="/categories" />;
  }

  return <CategoryForm handleSubmit={onSubmit} />;
};
