import React from "react";
import { Router } from "./Router";
import { Routes } from "./Routes";

const App = (props) => (
  <Router path={props.path}>
    <Routes />
  </Router>
);

export default App;
