import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component, ...rest }) {
  const state = useSelector((state) => state.user);

  return state.user && state.user.role === "admin" ? (
    <Route component={component} {...rest} />
  ) : (
    <Redirect to="/" />
  );
}

