import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { login, signup } from './../redux/users/userActions';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
  },
  formField: {
    marginBottom: '18px',
  },
  actionBtn: {
    width: '50%',
    margin: '0 auto',
  },
  '@media (max-width: 768px)': {
    root: {
      width: '90%',
    },
  },
}));

const Login = () => {
  const [tab, setTab] = useState(0);
  const [loginForm, setLoginForm] = useState({
    user_name: null,
    password: null,
  });
  const [signupForm, setSignupForm] = useState({
    user_name: null,
    password: null,
    name: null,
    email: null,
    bio: null,
  });
  const userDetail = useSelector((state) => state.user.userDetail);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleLoginInputChange = (event) => {
    setLoginForm((loginForm) => ({
      ...loginForm,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSignupInputChange = (event) => {
    setSignupForm((signupForm) => ({
      ...signupForm,
      [event.target.id]: event.target.value,
    }));
  };

  const handleLogin = () => {
    dispatch(login(loginForm));
  };

  const handleSignup = () => {
    dispatch(signup(signupForm));
  };

  useEffect(() => {
    if (userDetail) {
      history.push('/');
    }
  }, [userDetail, history]);

  return (
    <Paper
      className={classes.root}
      component={Container}
      maxWidth="xs"
      elevation={5}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item md={12} sm={12} xs={12}>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            centered={true}
            variant="fullWidth"
          >
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          {tab === 0 ? (
            <form className={classes.form}>
              <TextField
                className={classes.formField}
                variant="outlined"
                label="username"
                id="user_name"
                onChange={handleLoginInputChange}
                size="small"
              />
              <TextField
                className={classes.formField}
                type="password"
                variant="outlined"
                label="password"
                id="password"
                onChange={handleLoginInputChange}
                size="small"
              />
              <Button
                className={classes.actionBtn}
                variant="contained"
                color="primary"
                size="small"
                onClick={handleLogin}
              >
                Login
              </Button>
            </form>
          ) : (
            <form className={classes.form}>
              <TextField
                className={classes.formField}
                variant="outlined"
                label="Enter username"
                size="small"
                id="user_name"
                onChange={handleSignupInputChange}
              />
              <TextField
                className={classes.formField}
                variant="outlined"
                label="Enter full name"
                size="small"
                id="name"
                onChange={handleSignupInputChange}
              />
              <TextField
                type="email"
                className={classes.formField}
                variant="outlined"
                label="Enter your email"
                size="small"
                id="email"
                onChange={handleSignupInputChange}
              />
              <TextField
                className={classes.formField}
                variant="outlined"
                label="Enter your bio"
                size="small"
                id="bio"
                onChange={handleSignupInputChange}
              />
              <TextField
                className={classes.formField}
                type="password"
                variant="outlined"
                label="Enter password"
                size="small"
                id="password"
                onChange={handleSignupInputChange}
              />
              <TextField
                className={classes.formField}
                type="password"
                variant="outlined"
                label="Re-enter password"
                size="small"
              />
              <Button
                className={classes.actionBtn}
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSignup}
              >
                Signup
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
