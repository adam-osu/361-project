import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  display: flex;
  justify-content: center;
  padding: ${(props) => buttonStyles[props.size].padding};
  background: ${(props) => buttonStyles[props.variant].background};
  font-size: ${(props) => buttonStyles[props.size].fontSize};
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  width: fit-content;
  border-radius: 5px;
`;

interface LinkButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium";
  linkTo: string;
  text: string;
  state?: any;
}

export const LinkButton = ({
  variant = "primary",
  size = "medium",
  linkTo,
  text,
  state = null,
}: LinkButtonProps) => {
  return (
    <StyledLink
      size={size}
      variant={variant}
      // to={linkTo}
      to={{ pathname: linkTo, state }}
      // state={state}
    >
      {text}
    </StyledLink>
  );
};
