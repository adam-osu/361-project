import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Button } from "../../shared/components/Button";
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

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      status
    }
  }
`;

export const Categories = () => {
  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);
  const [
    deleteCategory,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    refetch();
  }, [deleteData]);

  const handleDelete = (id) => {
    return () => deleteCategory({ variables: { id } });
  };

  return (
    <>
      <h1>Categories</h1>
      <LinkButton linkTo="/categories/new">Add Category</LinkButton>
      {data?.categories ? (
        <Table>
          <TableHead>
            <th>Name</th>
            <th>Description</th>
            <th>Update</th>
          </TableHead>
          <tbody>
            {data.categories.map((category) => (
              <tr>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell contained>
                  <LinkButton
                    variant="secondary"
                    size="small"
                    linkTo={"/categories/edit"}
                    state={category}
                  >
                    Update
                  </LinkButton>
                </TableCell>
                <TableCell contained>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={handleDelete(category.id)}
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
