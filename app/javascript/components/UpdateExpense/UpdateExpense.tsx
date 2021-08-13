import React from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { ExpenseForm } from "../../shared/components/ExpenseForm";

const UPDATE_EXPENSE = gql`
  mutation UpdateExpense(
    $id: Int!
    $title: String!
    $amount: Float!
    $categoryId: Int
  ) {
    updateExpense(
      id: $id
      title: $title
      amount: $amount
      categoryId: $categoryId
    ) {
      status
    }
  }
`;

export const UpdateExpense = () => {
  const [updateExpense, { data, loading, error }] = useMutation(UPDATE_EXPENSE);

  if (data) {
    return <Redirect to="/expenses" />;
  }

  const handleSubmit = async ({ id, title, amount, categoryId }) => {
    await updateExpense({
      variables: {
        id,
        title,
        amount: parseFloat(amount),
        categoryId: parseInt(categoryId),
      },
    });
  };

  return <ExpenseForm handleSubmit={handleSubmit} />;
};
