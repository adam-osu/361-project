import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

const Info = styled.div`
  max-width: 24em;
`;

export const CategoryInfo = () => {
  return (
    <>
      <span data-tip data-for="categoryInfo">
        <i className="far fa-question-circle"></i>
      </span>
      <ReactTooltip place="bottom" id="categoryInfo">
        <Info>
          To better help you track your expenses, consider creating categories.
          <br />
          <br />
          With categories you'll be able to:
          <br />
          <br />
          <p>- Gain insights into where you're spending your money</p>
          <p>- Generate reports to view a breakdown of expenses by category</p>
          <p>- Re-assign existing expenses to different categories</p>
          <br />
          <br />
          <p>Click on "Categories" in the navigation to get started</p>
        </Info>
      </ReactTooltip>
    </>
  );
};
