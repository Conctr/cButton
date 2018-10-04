// Packages
import React, { Component } from 'react';
import api from '../components/api/api';

// Material UI Components
import { TextField, Button, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    padding: theme.spacing.unit * 0.5,
  },
  buttonStyle: {
    padding: '20px'
  }
});

class ForgotPassword extends Component {

  state = {
    email: ''
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();

    api.ForgotPassword(this.state.email)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .then(this.props.history.push('/login'))

      .catch(err => {
        console.log(err.request.status);
      }
      );
  }

  render() {
    const { email } = this.state;
    const { classes } = this.props;

    return (
      <Grid container alignItems="center" justify="center">
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit} >
            <Grid item xs={12} sm={12} >
              <h4>Please enter your email address:</h4>
            </Grid>
            <Grid item sm={12} xs={12} className={classes.form}>
              <TextField
                name="email"
                label="Email"
                onChange={this.handleChange}
                value={email}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonStyle}>
              <Button type="submit" variant="contained" color="primary" fullWidth> Change Password </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ForgotPassword);