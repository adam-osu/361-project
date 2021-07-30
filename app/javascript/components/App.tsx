import React from "react";
import { Router } from "./Router";
import { Routes } from "./Routes";
import { Reset } from "styled-reset";

const App = (props) => (
  <Router path={props.path}>
    <Reset />
    <Routes />
  </Router>
);

export default App;
