import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { LinkButton } from "../../shared/components/LinkButton";
import { Table, TableHead, TableCell } from "../../shared/components/Table";

const GET_EXPENSES = gql`
  query getExpenses {
    expenses {
      title
      amount
      category {
        name
      }
    }
  }
`;

export const Expenses = () => {
  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <h1>Expenses</h1>
      <LinkButton linkTo="/expenses/new" text="Add Expense" />
      {data?.expenses ? (
        <Table>
          <TableHead>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};
