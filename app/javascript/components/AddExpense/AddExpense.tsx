import React from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { ExpenseForm } from "../../shared/components/ExpenseForm";

const CREATE_EXPENSE = gql`
  mutation createExpense(
    $title: String!
    $amount: Float!
    $categoryId: Int
    $expensedAt: ISO8601DateTime
  ) {
    createExpense(
      title: $title
      amount: $amount
      categoryId: $categoryId
      expensedAt: $expensedAt
    ) {
      title
    }
  }
`;

export const AddExpense = () => {
  const [createExpense, { data, loading, error }] = useMutation(CREATE_EXPENSE);

  if (data) {
    return <Redirect to="/expenses" />;
  }

  const handleSubmit = async ({ title, amount, categoryId, expensedAt }) => {
    await createExpense({
      variables: {
        title,
        amount: parseFloat(amount),
        categoryId: parseInt(categoryId),
        expensedAt,
      },
    });
  };

  return <ExpenseForm handleSubmit={handleSubmit} />;
};
