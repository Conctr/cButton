import React, { Component } from 'react';
import api from '../components/api/api';
import { CONCTR_APP_ID } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/* Import Components */
import { Button, Grid, CardActions } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const styles = (theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});


class EmailForm extends Component {
  state = {
    reference: '',
    url: this.props.url,
  }

  notifyError = (messageText = 'An error has occurred.') => {
    toast.error(messageText, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true  
    });
  };

  notifySuccess = (messageText = 'Success!') => {
    toast.success(messageText, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true  
    });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  updateAction = event => {
    event.preventDefault();
    const deviceId = this.props.deviceId;

    const body = {
      'type': 'http_request',
      'config': {
        'url': this.state.url
      }
    };

    api.updateExistingAction(deviceId, body)
      .then(res => {
        this.notifySuccess('Action successfully updated');
        console.log(res);
      })
      .catch(err => {
        // If the action does not exist, move on to create an action.
        if (err.response.status === 404) {
          console.log('Action not found. Creating new action');
          this.createAction();
        } else { // Generic error handling
          this.notifyError('Error updating action.');
          console.log(err);
        }
      });
  }

  createAction = () => {
    const deviceId = this.props.deviceId;

    const body = {
      'reference': `action_${deviceId}`,
      'title': `action_${deviceId}`,
      'type': 'http_request',
      'config': {
        'url': this.state.url
      }
    };

    api.makeAction(body)
      .then(res => {
        console.log('action created');
        console.log(res);
        this.createRule();
      })
      .catch(err => {
        console.log('make action failed');
        console.log(err);
      });
  }

  createRule = () => {
    const deviceId = this.props.deviceId;

    const body = {
      'reference': `rule_${deviceId}`,
      'condition_type': 'all',
      'condition': {},
      'action_ids': [`${CONCTR_APP_ID}:action_${deviceId}:latest`],
      'device_ids': [
        `${deviceId}`
      ]
    };

    api.makeRule(body)
      .then(res => {
        this.notifySuccess('Successfully created action');
        console.log(res);
      })
      .catch(err => {
        this.notifyError();
        console.log(err);
      });
  }

  testTrigger = () => {
    const deviceId = this.props.deviceId;

    const body = {
      'button_pressed': true
    };

    api.ingestData(deviceId, body)
      .then(res => {
        this.notifySuccess('Test Trigger Sent!');
        console.log(res);
      })
      .catch(err => {
        this.notifyError();
        console.log(err);
      });
  }

  // To catch ValidatorForm type error
  handleSubmit = () => {
  }


  render() {
    const { classes } = this.props;
    const { url } = this.state;

    return (
      <div>

        <ValidatorForm onSubmit={this.handleSubmit}>
          <Grid item xs={12} className={classes.form}>
            <TextValidator
              label='URL'
              name='url'
              onChange={this.handleChange}
              value={url}
              validators={['required']}
              errorMessages={['This field is required']}
              fullWidth
              placeholder='Enter http_request URL'
            />
          </Grid>
          <br />
        </ValidatorForm>

        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button onClick={this.updateAction} variant='contained' color='secondary'>Update</Button>
          <Button onClick={this.testTrigger} variant='contained' color='primary'>Test</Button>
        </CardActions>

        <ToastContainer/>
      </div>

    );
  }
}

export default withStyles(styles)(EmailForm);