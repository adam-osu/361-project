import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Router } from "./Router";
import { Routes } from "./Routes";
import { Reset } from "styled-reset";

const csrfToken = document
  .querySelector("meta[name=csrf-token]")
  .getAttribute("content");
const client = new ApolloClient({
  link: new HttpLink({
    credentials: "same-origin",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
  }),
  cache: new InMemoryCache(),
});

const App = (props) => (
  <ApolloProvider client={client}>
    <Router path={props.path}>
      <Reset />
      <Routes />
    </Router>
  </ApolloProvider>
);

export default App;
