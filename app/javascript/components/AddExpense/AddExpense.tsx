import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_EXPENSE = gql`
  mutation createExpense($title: String!, $amount: Float!, $categoryId: Int) {
    createExpense(title: $title, amount: $amount, categoryId: $categoryId) {
      title
    }
  }
`;

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;

export const AddExpense = () => {
  const [createExpense, { data, loading, error }] = useMutation(CREATE_EXPENSE);

  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
    refetch: categoryRefetch,
  } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    categoryRefetch();
  }, []);

  const titleRef = React.useRef();
  const amountRef = React.useRef();
  const categoryRef = React.useRef();

  if (data) {
    return <Redirect to="/expenses" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef?.current?.value ?? "";
    const amount = amountRef?.current?.value ?? "";
    const categoryId = categoryRef?.current?.value ?? "";

    await createExpense({
      variables: {
        title,
        amount: parseFloat(amount),
        categoryId: parseInt(categoryId),
      },
    });
  };
  return (
    <>
      <h1>Add Expense</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input ref={titleRef} name="title" type="text" />
        </div>
        <div>
          <label htmlFor="amount">amount</label>
          {/* From https://stackoverflow.com/questions/34057595/allow-2-decimal-places-in-input-type-number/34057860 */}
          <input ref={amountRef} name="amount" type="number" step=".01" />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select ref={categoryRef} name="category">
            {categoryData
              ? categoryData.categories.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))
              : null}
            {/* <option>Test</option>
            <option>Test2</option> */}
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
