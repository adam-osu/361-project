import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonProps } from "../Button";

const buttonStyles = {
  small: {
    padding: ".25em 1em",
    fontSize: "12px",
  },
  medium: {
    padding: "0.5em 2em",
    fontSize: "16px",
  },
  primary: {
    background: "blue",
  },
  secondary: {
    background: "darkgrey",
  },
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

interface LinkButtonProps extends ButtonProps {
  linkTo: string;
  state?: any;
}

export const LinkButton = ({
  variant = "primary",
  size = "medium",
  linkTo,
  children,
  state = null,
}: LinkButtonProps) => {
  return (
    <StyledLink to={{ pathname: linkTo, state }}>
      <Button size={size} variant={variant} children={children}></Button>
    </StyledLink>
  );
};
