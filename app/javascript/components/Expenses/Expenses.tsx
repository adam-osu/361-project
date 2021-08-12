import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { useAuth } from "../Auth";
import { LinkButton } from "../../shared/components/LinkButton";
import { Table, TableHead, TableCell } from "../../shared/components/Table";

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
    }
  }
`;

export const Expenses = () => {
  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);
  const { user } = useAuth();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {user ? (
        <h1>Hello {user.firstName}! Here are your expenses</h1>
      ) : (
        <h1>Expenses</h1>
      )}
      <LinkButton linkTo="/expenses/new" text="Add Expense" />
      {data?.expenses ? (
        <Table>
          <TableHead>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Update</th>
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
                <TableCell>TBD</TableCell>
                <TableCell>
                  <LinkButton
                    variant={"secondary"}
                    size="small"
                    linkTo="/expenses/edit"
                    text="Update"
                    state={expense}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};
