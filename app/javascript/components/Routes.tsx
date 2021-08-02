import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home";
import { SignUp } from "./Signup/";
import { Login } from "./Login";
import { Expenses } from "./Expenses";
import { AddExpense } from "./AddExpense";
import { Layout } from "../shared/components/Layout";
import { Categories } from "./Categories";
import { AddCategories } from "./AddCategories";
import { Reports } from "./Reports";

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

const PublicRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
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
      <PublicRoute path="/signup">
        <SignUp />
      </PublicRoute>
      <PublicRoute path="/login">
        <Login />
      </PublicRoute>
      <PrivateRoute exact path="/expenses">
        <Expenses />
      </PrivateRoute>
      <PrivateRoute path="/expenses/new">
        <AddExpense />
      </PrivateRoute>
      <PrivateRoute exact path="/categories">
        <Categories />
      </PrivateRoute>
      <PrivateRoute path="/categories/new">
        <AddCategories />
      </PrivateRoute>
      <PrivateRoute path="/reports">
        <Reports />
      </PrivateRoute>
    </Switch>
  </Layout>
);
