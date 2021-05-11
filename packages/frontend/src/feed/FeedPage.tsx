import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Snackbar
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getFeed, submitTweet } from "./feedApi";
import {Alert, AlertTitle} from '@material-ui/lab';
import Slide from '@material-ui/core/Slide';

function transition(props) {
  return <Slide {...props} direction="down" />;
}

export default function FeedPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tweetInputValue, setTweetInputValue] = useState<String>("");

  
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  };


  useEffect(() => {
    getTweets();
  }, []);

  async function getTweets() {
    const tweets = await getFeed();
    setTweets(tweets);
  }

  async function submit(evt: SyntheticEvent) {
    evt.preventDefault();

    const value = tweetInputValue?.trim();

    if (!value) {
      return;
    }

    try {
      await submitTweet({ text: value });
    }
    catch (e) {
      console.log("error found");
      setOpen(true);
    }
    setTweetInputValue("");
    await getTweets();
  }

  return (
    <Grid item xs={10}>
      <Paper elevation={2}>
        <form onSubmit={(evt) => submit(evt)}>
          <FormControl fullWidth>
            <Input
              id="tweet-input"
              placeholder="What's happening?"
              value={tweetInputValue}
              onChange={(evt) => setTweetInputValue(evt.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Input type="submit" value="Tweet"></Input>
          </FormControl>
        </form>
      </Paper>
      {tweets.map((tweet) => (
        <Box key={tweet._id} padding={1}>
          <Paper elevation={1}>
            <Box padding={1}>@{tweet.user.handle}</Box>
            <Box padding={1}>{tweet.text}</Box>
          </Paper>
        </Box>
      ))}
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error">
        <AlertTitle>Error</AlertTitle>
          Please Log In To Tweet
        </Alert>
      </Snackbar>
    </Grid>
  );
}
