import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../../components/Auth";
import { client } from "../../../components/apolloClient";

const StyledContainer = styled.nav`
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

const LogoutLink = styled.div`
  cursor: pointer;
  padding: 0 1em;
`;

export const Navbar = () => {
  const { user, fetchUser } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    client.cache.reset();
    localStorage.removeItem("token");
    fetchUser();
    return history.push("/login");
  };

  return (
    <StyledContainer>
      <StyledLogoLink to="/">Expense Tracker</StyledLogoLink>
      <StyledMenu>
        {user ? (
          <>
            <StyledLink to="/expenses">Expenses</StyledLink>
            <StyledLink to="/categories">Categories</StyledLink>
            <StyledLink to="/reports">Reports</StyledLink>
            <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
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
