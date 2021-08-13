import React from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "../Auth";

export const Home = () => {
  const { user } = useAuth();
  return user ? <Redirect to="/expenses" /> : <Redirect to="/login" />;
};
