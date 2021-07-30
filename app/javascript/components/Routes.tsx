import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { SignUp } from "./Signup/";
import { Login } from "./Login";
import { Navbar } from "../shared/components/Navbar";

export const Routes = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Switch>
  </>
);
