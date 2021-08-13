import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { LinkButton } from "../../shared/components/LinkButton";
import { Table, TableHead, TableCell } from "../../shared/components/Table";

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
      description
    }
  }
`;

export const Categories = () => {
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <h1>Categories</h1>
      <LinkButton linkTo="/categories/new">Add Category</LinkButton>
      {data?.categories ? (
        <Table>
          <TableHead>
            <th>Name</th>
            <th>Description</th>
          </TableHead>
          <tbody>
            {data.categories.map((category) => (
              <tr>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
};
