import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Redirect, useLocation } from "react-router-dom";

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;

interface ExpenseFormProps {
  handleSubmit: any;
  title?: string;
  amount?: string;
  category?: any;
  location?: any;
}

export const ExpenseForm = ({ handleSubmit }: ExpenseFormProps) => {
  const location = useLocation();

  const id = location?.state?.id;
  const title = location?.state?.title;
  const amount = location?.state?.amount;
  const category = location?.state?.category;

  const [titleState, setTitle] = useState(title || "");
  const [amountState, setAmount] = useState(amount || "");
  const [categoryState, setCategory] = useState(category?.id || null);
  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
    refetch: categoryRefetch,
  } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    categoryRefetch();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await handleSubmit({
      id,
      title: titleState,
      amount: amountState,
      categoryId: categoryState,
    });
  };

  return (
    <>
      <h1>Add Expense</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            value={titleState ?? ""}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="amount">amount</label>
          {/* From https://stackoverflow.com/questions/34057595/allow-2-decimal-places-in-input-type-number/34057860 */}
          <input
            value={amountState ?? ""}
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
            type="number"
            step=".01"
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            value={categoryState}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          >
            {category ? (
              <option value={category.id}>{category.name}</option>
            ) : null}
            {categoryData
              ? categoryData.categories.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))
              : null}
          </select>
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input disabled name="date" type="date" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
