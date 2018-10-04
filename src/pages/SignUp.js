// Packages
import React, { Component } from 'react';
import Recaptcha from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import api from '../components/api/api';
import { OAUTH_GOOGLE_CLIENT_ID, RECAPTCHA_SITE_KEY } from '../config';

// Material UI Components
import { Button, Paper, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { withStyles } from '@material-ui/core/styles';

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
  },
  recaptcha: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});


class SignUp extends Component {
  state = {
    email: '',
    pwd: '',
    pwdConfirm: '',
    recaptchaResponse: null,
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value === this.state.pwd) {
        return true;
      }
      return false;
    });

    ValidatorForm.addValidationRule('isPasswordMet', (value) => {
      const minLength = value.length >= 8;
      const leastOneNum = value.search(/[0-9]/) !== -1;
      const leastUpCase = value.search(/[A-Z]/) !== -1;

      if (minLength && leastOneNum && leastUpCase) {
        return true;
      }
      return false;
    });
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  notifyError = () => {
    toast.error('Email already registered. Please try another email address', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  notifyWarning = () => {
    toast.warn('Something went wrong. Please try again later', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    api.signupConsumer(this.state.email, this.state.pwd, this.state.recaptchaResponse)
      .then(res => {
        if (res.status === 201) {
          localStorage.setItem('jwt', res.data.jwt);
          window.location.href = ('/mydevices');
        }
      })
      .catch(err => {
        window.grecaptcha.reset();
        if (err.request.status === 409) {
          this.notifyError();
        } else {
          this.notifyWarning();
        }
      });
  }

  handleReCaptchaResponse = (response) => {
    if (response) {
      this.setState({
        recaptchaResponse: response
      });
    }
  }

  googleRegister = (response) => {
    const accessToken = response.Zi.access_token;
    const provider = 'google';

    api.oAuthSignup(provider, accessToken)
      .then(res => {
        if (res.status === 201) {
          localStorage.setItem('jwt', res.data.jwt);
          window.location.href = ('/mydevices');
        }
      })
      .catch(err => {
        if (err.request.status === 409) {
          this.notifyError();
        } else {
          this.notifyWarning();
        }
      });
  }

  render() {
    const { email, pwd, pwdConfirm } = this.state;
    const { classes } = this.props;

    document.getElementById('googleButton');

    return (
      <div >
        <Grid container alignItems="center" justify="center" spacing={16}>

          <Paper className={classes.paper}>

            <Grid item xs={12} sm={12} >
              <img className={classes.logo} src={require('../theme/logo.png')} alt="Logo" height="89" width="225" />
            </Grid>

            <ValidatorForm onSubmit={this.handleSubmit} instantValidate={true}>
              <Grid item xs={12} className={classes.form} >
                <TextValidator
                  ref="email"
                  name="email"
                  label="Email"
                  onChange={this.handleChange}
                  value={email}
                  margin="normal"
                  validators={['required', 'isEmail']}
                  errorMessages={['This field ss required', 'Email is not valid']}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} className={classes.form}>
                <TextValidator
                  ref="pwd"
                  name="pwd"
                  type="password"
                  label="Password"
                  onChange={this.handleChange}
                  value={pwd}
                  margin="normal"
                  validators={['required', 'isPasswordMet']}
                  errorMessages={['This field is required', 'Must include 8 characters, 1 Upcase and 1 number']}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} className={classes.form} >
                <TextValidator
                  ref="pwdConfirm"
                  name="pwdConfirm"
                  type="password"
                  label="Confirm Password"
                  margin="normal"
                  onChange={this.handleChange}
                  value={pwdConfirm}
                  validators={['required', 'isPasswordMet', 'isPasswordMatch']}
                  errorMessages={['This field is required', 'Must include 8 characters, 1 Upcase and 1 number', 'Passwords must match']}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} className={classes.recaptcha} >
                <Recaptcha
                  sitekey={RECAPTCHA_SITE_KEY}
                  render="explicit"
                  onChange={this.handleReCaptchaResponse}
                />
              </Grid>

              <GoogleLogin
                clientId={OAUTH_GOOGLE_CLIENT_ID}
                buttonText="Sign Up with Google"
                onSuccess={this.googleRegister}
                onFailure={this.googleRegister}
              />

              <Grid item xs={12} className={classes.buttonStyle}>
                <Button type="submit" variant="contained" color="primary" className={classes.buttonStyle} fullWidth> Sign Up </Button>
              </Grid>

              <Grid item xs={12} className={classes.signIn}>
                <Link to="/login"> or, sign in here </Link>
              </Grid>

            </ValidatorForm>
          </Paper>
        </Grid>
        <ToastContainer />
      </div >
    );
  }
}

export default withStyles(styles)(SignUp);