import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home";
import { SignUp } from "./Signup/";
import { Login } from "./Login";
import { Expenses } from "./Expenses";
import { Layout } from "../shared/components/Layout";

import { useAuth } from "./Auth";

// From https://reactrouter.com/web/example/auth-workflow
// useAuth hook return user object if logged in, null otherwise
// If logged in render component, otherwise redirect to login
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/expenses">
        <Expenses />
      </PrivateRoute>
    </Switch>
  </Layout>
);
