import React, { ButtonHTMLAttributes } from "react";
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
  danger: {
    background: "red",
  },
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  padding: ${(props) => buttonStyles[props.size].padding};
  background: ${(props) => buttonStyles[props.variant].background};
  font-size: ${(props) => buttonStyles[props.size].fontSize};
  font-weight: 500;
  color: #fff;
  width: fit-content;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium";
  children: React.ReactChild;
  onClick?: () => void;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton size={size} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};
