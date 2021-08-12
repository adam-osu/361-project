import React from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { ExpenseForm } from "../../shared/components/ExpenseForm";

const CREATE_EXPENSE = gql`
  mutation createExpense($title: String!, $amount: Float!, $categoryId: Int) {
    createExpense(title: $title, amount: $amount, categoryId: $categoryId) {
      title
    }
  }
`;

export const AddExpense = () => {
  const [createExpense, { data, loading, error }] = useMutation(CREATE_EXPENSE);

  if (data) {
    return <Redirect to="/expenses" />;
  }

  const handleSubmit = async ({ title, amount, categoryId }) => {
    await createExpense({
      variables: {
        title,
        amount: parseFloat(amount),
        categoryId: parseInt(categoryId),
      },
    });
  };

  return <ExpenseForm handleSubmit={handleSubmit} />;
};
