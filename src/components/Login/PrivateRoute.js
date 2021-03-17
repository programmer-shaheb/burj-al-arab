import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { userContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [isLoogedIn, setIsLoogedIn] = useContext(userContext);

  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          isLoogedIn ? (
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
    </>
  );
};

export default PrivateRoute;
