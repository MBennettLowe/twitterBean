import { FormControl, Grid, Input, Box, Typography, Snackbar} from "@material-ui/core";
//import { Alert } from '@material-ui/lab';
import {Alert, AlertTitle} from '@material-ui/lab';
import React, { useContext, useState } from "react";
import { StateContext, ContextType } from "../StateProvider";
import { register } from "./authApi";
import { Link, Redirect } from "react-router-dom";

export default function LoginPage() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { state, dispatch } = useContext<ContextType>(StateContext);

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  };

  async function handleSubmit(evt: any) {
    evt.preventDefault();

    try {
      const user = await register(handle, password, email);
      dispatch({
        type: "setUser",
        payload: user,
      });
    } catch (e) {
      console.log(e);
      setOpen(true);
      //alert("Failed to login.");
    }
  }

  if (state.user) {
    return <Redirect to="/" />;
  }

  return (
    <>

      <Grid container>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              
              <Typography variant="h4">Welcome to Twitterbean!</Typography>
              <Typography variant="h6">Make new friends!</Typography>
              <Typography variant="h6">Talk about things!</Typography>
              <Typography variant="h6">Be part of a community!</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={1}>
              {/* Empty grid for spacing */}
            </Grid>
            <Grid item xs={4}>
              <form onSubmit={(evt) => handleSubmit(evt)}>
                <FormControl fullWidth>
                  <Input
                    id="handle"
                    placeholder="Handle"
                    value={handle}
                    onChange={(evt) => setHandle(evt.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Input
                    type="email"
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Input type="submit" value="Register"></Input>
                </FormControl>
              </form>
              Already have an account? <Link to="/auth/login">Sign in</Link>.
            </Grid>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
          <AlertTitle>Error</AlertTitle>
            Problem With Registration
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}
