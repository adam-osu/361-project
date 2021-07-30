import React from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";

export const Router = ({ children, path }) => {
  if (typeof window !== "undefined") {
    return <BrowserRouter>{children}</BrowserRouter>;
  } else {
    return (
      <StaticRouter location={path} context={{}}>
        {children}
      </StaticRouter>
    );
  }
};
