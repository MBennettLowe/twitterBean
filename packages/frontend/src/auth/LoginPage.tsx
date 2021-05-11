import { FormControl, Grid, Input, Box, Typography, Snackbar } from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import React, { useContext, useState } from "react";
import { StateContext, ContextType } from "../StateProvider";
import { login } from "./authApi";
import { Link, Redirect } from "react-router-dom";
import Slide from '@material-ui/core/Slide';

function transition(props) {
  return <Slide {...props} direction="down" />;
}

export default function LoginPage() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext<ContextType>(StateContext);

  const [open, setOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);

  function handleLoginClose() {
    setLoginOpen(false);
  };

  function handleClose() {
    setOpen(false);
  };

  let caught = false;
  async function handleSubmit(evt: any) {
    evt.preventDefault();

    try {
      const user = await login(handle, password);
      dispatch({
        type: "setUser",
        payload: user,
      });

    } catch (e) {
      //console.log(e);
      caught = true;
      setOpen(true);
    } 
    if (!caught) {
      console.log("no error caught");
      setLoginOpen(true);
      caught = false;
    }


  }

  if (state.user) {
    return <Redirect to="/" />;
  }

  return (
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
                <Input type="submit" value="Login"></Input>
              </FormControl>
            </form>
            Don't have an account? <Link to="/auth/register">Sign Up</Link>.
          </Grid>
        </Grid>
      </Grid>
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        <Alert onClose={handleClose} severity="error">
        <AlertTitle>Error</AlertTitle>
          Username And / Or Password Is Incorrect
        </Alert>
      </Snackbar>
      <Snackbar 
        open={loginOpen} 
        autoHideDuration={6000} 
        onClose={handleLoginClose} 
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        <Alert onClose={handleLoginClose} severity="success">
        <AlertTitle>Success</AlertTitle>
          Successfully Logged In!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
