import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Router } from "./Router";
import { Routes } from "./Routes";
import { Reset } from "styled-reset";

import { ProvideAuth } from "../components/Auth/authProvider";
import { client } from "./apolloClient";

const App = (props) => (
  <ApolloProvider client={client}>
    <ProvideAuth>
      <Router path={props.path}>
        <Reset />
        <Routes />
      </Router>
    </ProvideAuth>
  </ApolloProvider>
);

export default App;
