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
    minWidth: '300px',
  },
  form: {
    padding: theme.spacing.unit * 0.5,
  },
  buttonStyle: {
    padding: '20px'
  }
});

class Profile extends Component {

  state = {
    profile: {
      f_name: '',
      l_name: '',
      email: '',
      cur_pwd: '',
      new_pwd: ''
    },
    conf_new_pwd: ''
  }

  componentDidMount = () => {
    this.getProfileData();
  }

  getProfileData = () => {
    api.getConsumerProfile()
      .then((res) => {
        console.log(res);
        this.setState(() => ({
          profile: res.data.data
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    return (

      <Grid container alignItems="center" justify="center" >
        <Grid item xs={10} sm={3} >
          <Paper className={classes.paper}>

            <form onSubmit={this.handleSubmit}>

              <Grid item sm={12} xs={12} className={classes.form}>
                <TextField
                  name="f_name"
                  label="First Name"
                  onChange={this.handleChange}
                  value={this.state.profile.f_name}
                  fullWidth
                />
              </Grid>

              <Grid item sm={12} xs={12} className={classes.form}>
                <TextField
                  name="l_name"
                  label="Last Name"
                  onChange={this.handleChange}
                  value={this.state.profile.l_name}
                  fullWidth
                />
              </Grid>

              <Grid item sm={12} xs={12} className={classes.form}>
                <TextField
                  name="email"
                  label="Email"
                  onChange={this.handleChange}
                  value={this.state.profile.email}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item sm={12} xs={12} className={classes.form}>
                <TextField
                  name="cur_pwd"
                  label="Current Password"
                  onChange={this.handleChange}
                  value={this.state.profile.cur_pwd}
                  fullWidth
                />
              </Grid>

              <Grid item sm={12} xs={12} className={classes.form}>
                <TextField
                  name="new_pwd"
                  label="New Password"
                  onChange={this.handleChange}
                  value={this.state.profile.new_pwd}
                  fullWidth
                />
              </Grid>

              <Grid item sm={12} xs={12} className={classes.form}>
                <TextField
                  name="conf_new_pwd"
                  label="Confirm Password"
                  onChange={this.handleChange}
                  value={this.state.conf_new_pwd}
                  fullWidth
                />
              </Grid>

              <Grid className={classes.buttonStyle}>
                <Button type="submit" variant="contained" color="primary" fullWidth> Update </Button>
              </Grid>

            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Profile);