import React from "react";

import { useAuth } from "../Auth";

export const Home = () => {
  const { user } = useAuth();
  return user ? <h1>Welcome {user.firstName}!</h1> : <h1>Home</h1>;
};
