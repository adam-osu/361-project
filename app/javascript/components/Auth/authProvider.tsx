import React, { useState, useEffect, useContext, createContext } from "react";

// Adapted from https://usehooks.com/useAuth/
// Creates a provider so we can access auth state
// in any component

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const userQuery = {
    query: "query { currentUser {email firstName lastName} }",
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return setUser(null);
    }

    const { data } = await fetch("http://localhost:3000/graphql", {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
        "content-type": "application/json",
        "x-csrf-token": document
          .querySelector("meta[name=csrf-token]")
          .getAttribute("content"),
      },
      body: JSON.stringify(userQuery),
      method: "POST",
    }).then((res) => {
      return res.json();
    });

    setUser(data?.currentUser ? data.currentUser : null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    fetchUser,
  };
}

export const authContext = createContext(null);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
