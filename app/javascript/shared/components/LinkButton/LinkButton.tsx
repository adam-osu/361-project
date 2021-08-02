import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  padding: 0.5em 2em;
  background: blue;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  width: fit-content;
  border-radius: 5px;
`;

interface LinkButtonProps {
  linkTo: string;
  text: string;
}

export const LinkButton = ({ linkTo, text }: LinkButtonProps) => {
  return <StyledLink to={linkTo}>{text}</StyledLink>;
};
