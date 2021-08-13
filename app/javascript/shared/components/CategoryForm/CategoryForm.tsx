import React, { useState } from "react";
import { useLocation } from "react-router-dom";

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
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={nameState}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            value={descriptionState}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            type="text"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
