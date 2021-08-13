import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { TextField } from "../TextField";

export const CategoryForm = ({ handleSubmit }) => {
  const location = useLocation();

  const id = location?.state?.id;
  const name = location?.state?.name;
  const description = location?.state?.description;

  const [nameState, setName] = useState(name || "");
  const [descriptionState, setDescription] = useState(description || "");

  const onSubmit = async (e) => {
    e.preventDefault();

    await handleSubmit({ id, name: nameState, description: descriptionState });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          label="Name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={nameState}
        />
        <TextField
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          value={descriptionState}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
