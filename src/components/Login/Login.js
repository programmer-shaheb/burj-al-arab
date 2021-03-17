import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { Button } from "@material-ui/core";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

const Login = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const [isLoogedIn, setIsLoogedIn] = useContext(userContext);

  const provider = new firebase.auth.GoogleAuthProvider();

  const [users, setUsers] = useState("");

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const googleHandler = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUsers(result.user);
        setIsLoogedIn(result);
        history.replace(from);
        console.log(result.user);
      });
  };

  const logOut = () => {
    setIsLoogedIn("");
    setUsers("");
  };

  return (
    <div>
      <h1>This is {users.displayName} </h1>
      <Button onClick={googleHandler} variant="contained" color="primary">
        Sign Up With Google
      </Button>
      <Button onClick={logOut} variant="contained" color="secondary">
        Log Out
      </Button>
    </div>
  );
};

export default Login;
