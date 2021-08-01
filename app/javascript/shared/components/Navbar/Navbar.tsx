import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useAuth } from "../../../components/Auth";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #eee;
`;

const StyledLogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 500;
  text-decoration: none;

  &:visited {
    color: unset;
  }
`;

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  padding: 0 1em;
  text-decoration: none;
  color: #000;

  &:visited {
    color: unset;
  }
`;

export const Navbar = () => {
  const user = useAuth();

  return (
    <StyledContainer>
      <StyledLogoLink to="/">Expense Tracker</StyledLogoLink>
      <StyledMenu>
        {user ? (
          <>
            <StyledLink to="/expenses">Expenses</StyledLink>
            <StyledLink to="/categories">Categories</StyledLink>
            <StyledLink to="/reports">Reports</StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/signup">Sign up</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
          </>
        )}
      </StyledMenu>
    </StyledContainer>
  );
};
