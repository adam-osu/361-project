import React from "react";
import styled from "styled-components";
import { Navbar } from "../Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 1em auto;
`;

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
