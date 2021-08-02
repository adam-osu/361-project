import React from "react";

import { LinkButton } from "../../shared/components/LinkButton";

export const Categories = () => {
  return (
    <>
      <h1>Categories</h1>
      <LinkButton linkTo="/categories/new" text="Add Category" />
    </>
  );
};
