// Packages
import React from 'react';
import api from '../components/api/api';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { OAUTH_GOOGLE_CLIENT_ID } from '../config';

// Material UI Components
import { TextField, Button, Paper, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '320px'
  },
  form: {
    padding: theme.spacing.unit * 0.5,
  },
  logo: {
    marginTop: '20px',
  },
  buttonStyle: {
    padding: '20px'
  },
  link: {
    padding: theme.spacing.unit * 2,
  }
});

class Login extends React.Component {
  state = {
    email: '',
    pwd: ''
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  notifyError = () => {
    toast.error('Email address or password is incorrect', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  notifyWarning = () => {
    toast.warn('Authentication Failed', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { email, pwd } = this.state;

    api.loginConsumer(email, pwd)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('jwt', res.data.jwt);
          window.location.href = '/mydevices';
        }
      })
      .catch(err => {
        if (err.request.status === 401) {
          this.notifyError();
        } else {
          this.notifyWarning();
        }
      });
  }

  googleLogin = (response) => {
    const accessToken = response.Zi.access_token;
    const provider = 'google';

    api.oAuthLogin(provider, accessToken)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('jwt', res.data.jwt);
          window.location.href = ('/mydevices');
        }
      })
      .catch(err => {
        if (err.request.status === 401) {
          this.notifyError();
        } else {
          this.notifyWarning();
        }
      });
  }

  render() {
    const { email } = this.state;
    const { classes } = this.props;

    return (
      <Grid container alignItems="center" justify="center" >
        <Paper className={classes.paper}>
          <ValidatorForm onSubmit={this.handleSubmit} instantValidate={true}>

            <Grid item xs={12} sm={12} >
              <img className={classes.logo} src={require('../theme/logo.png')} alt="Logo" height="89" width="225" />
            </Grid>

            <Grid item xs={12} className={classes.form}>
              <TextValidator
                name="email"
                label="email"
                onChange={this.handleChange}
                value={email}
                margin="normal"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} className={classes.form}>
              <TextField
                name="pwd"
                type="password"
                label="Password"
                onChange={this.handleChange}
                margin="normal"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} className={classes.buttonStyle}  >
              <Button type="submit" variant="contained" color="primary" fullWidth >Login</Button>
            </Grid>

            <Grid item xs={12} className={classes.buttonStyle}>
              <GoogleLogin
                clientId={OAUTH_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={this.googleLogin}
                onFailure={this.googleLogin}
              />

            </Grid>

            <Grid item xs={12} className={classes.link}>
              <Link to="/signup"> not registered? sign up here!</Link>
            </Grid>

            <Grid item xs={12} >
              <Link to="/forgotpassword"> forgot password?</Link>
            </Grid>

            <ToastContainer />
          </ValidatorForm>
        </Paper>

      </Grid>
    );
  }
}

export default withStyles(styles)(Login);