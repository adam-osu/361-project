import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";

import { useAuth } from "../Auth";
import { LinkButton } from "../../shared/components/LinkButton";
import { Table, TableHead, TableCell } from "../../shared/components/Table";
import { Button } from "../../shared/components/Button";
import { CategoryInfo } from "../../shared/components/CategoryInfo";

const GET_EXPENSES = gql`
  query getExpenses {
    expenses {
      id
      title
      amount
      category {
        id
        name
      }
      expensedAt
    }
  }
`;

const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: Int!) {
    deleteExpense(id: $id) {
      status
    }
  }
`;

const Notification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: green;
  border-radius: 5px;
  width: 15em;
  padding: 0.5em;
  font-size: 16px;
`;

export const Expenses = () => {
  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);
  const [
    deleteExpense,
    { loading: deleteLoading, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_EXPENSE);
  const [notification, setNotification] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    refetch();
  }, [deleteData]);

  const onDeleteExpense = (id) => {
    return () => {
      deleteExpense({ variables: { id: id } });
      setNotification("Expense was deleted successfully");

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };
  };

  return (
    <>
      {user ? (
        <h1>Hello {user.firstName}! Here are your expenses</h1>
      ) : (
        <h1>Expenses</h1>
      )}
      {notification ? <Notification>{notification}</Notification> : null}
      <LinkButton linkTo="/expenses/new">Add Expense</LinkButton>
      {data?.expenses ? (
        <Table>
          <TableHead>
            <th>Title</th>
            <th>Amount</th>
            <th>
              Category <CategoryInfo />
            </th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </TableHead>
          <tbody>
            {data.expenses.map((expense) => (
              <tr>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                {expense.category ? (
                  <TableCell>{expense.category.name}</TableCell>
                ) : (
                  <TableCell>N / A</TableCell>
                )}
                <TableCell>
                  {expense.expensedAt
                    ? expense.expensedAt.substr(0, 10)
                    : "N / A"}
                </TableCell>
                <TableCell contained>
                  <LinkButton
                    variant={"secondary"}
                    size="small"
                    linkTo="/expenses/edit"
                    state={expense}
                  >
                    Update
                  </LinkButton>
                </TableCell>
                <TableCell contained>
                  <Button
                    onClick={onDeleteExpense(expense.id)}
                    variant={"danger"}
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};
