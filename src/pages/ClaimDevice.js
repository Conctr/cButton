// Packages
import React, { Component } from 'react';
import axios from 'axios';
import api from '../components/api/api';
import { DEVICE_CLAIM_AWS_LAMBDA_API_GATEWAY } from '../config';

// Material UI Components
import { TextField, Button, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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

class ClaimDevice extends Component {
  state = {
    device_id: '',
    consumer_claim_key: '',
    consumer_email: ''
  }

  componentDidMount = () => {
    this.getProfileData();
  }

  getProfileData = () => {
    api.getConsumerProfile()
      .then((res) => {
        this.setState({ consumer_email: res.data.data.email });
        console.log(this.state.consumer_email);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  notifyError = () => {
    toast.error('Device ID or Claim Key is incorrect', {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.post(`${DEVICE_CLAIM_AWS_LAMBDA_API_GATEWAY}`, {
      consumer_email: this.state.consumer_email,
      device_id: this.state.device_id,
      consumer_claim_key: this.state.consumer_claim_key
    })
      .then(response => {
        response = response.data;
        if (response.errorMessage) {
          this.notifyError();
        } else {
          window.location.href = ('/mydevices');
        }
      })
      .catch(error => {
        console.log(error);
        this.notifyError();
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container alignItems="center" justify="center">
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>

            <Grid item sm={12} xs={12}  >
              <h4>Please enter the device ID and claim key <br /> into the form field below:</h4>
            </Grid>

            <Grid item sm={12} xs={12} className={classes.form}>
              <TextField
                name="device_id"
                label="Button ID"
                onChange={this.handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item sm={12} xs={12} className={classes.form}>
              <TextField
                name="consumer_claim_key"
                label="Claim key"
                onChange={this.handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} className={classes.buttonStyle}>
              <Button type="submit" variant="contained" color="primary" fullWidth > Register Button </Button>
            </Grid>
          </form>
          <ToastContainer />
        </Paper>
      </Grid>
    );
  }

};

export default withStyles(styles)(ClaimDevice); 