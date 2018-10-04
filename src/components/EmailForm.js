import React, { Component } from 'react';
import api from '../components/api/api';
import { CONCTR_APP_ID, SES_SOURCE, SES_ARN } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/* Import Components */
import { Button, Grid, CardActions, TextField } from '@material-ui/core/';
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
    to: this.props.to[0],
    subject: this.props.subject,
    message: this.props.message
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
      'type': 'ses',
      'config': {
        'sourceArn': `${SES_ARN}`,
        'source': `${SES_SOURCE}`,
        'to': [this.state.to],
        'subject': this.state.subject
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
      'type': 'ses',
      'config': {
        'sourceArn': `${SES_ARN}`,
        'source': `${SES_SOURCE}`,
        'to': [this.state.to],
        'subject': this.state.subject
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

  // Currently unused
  updateEmailBody = () => {
    const deviceId = this.props.deviceId;

    const body = {
      'body': this.state.message,
      'bodyType': 'Text'
    };

    api.ingestData(deviceId, body)
      .then(res => {
        console.log('successfully updated email body');
        console.log(res);
      })
      .catch(err => {
        console.log('email body failed to ingest');
        console.log(err);
      });

  }

  testTrigger = () => {
    const deviceId = this.props.deviceId;

    const body = {
      'button_pressed': true,
      'body': this.state.message,
      'bodyType': 'Text'
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

  // To catch ValidatorForm type
  handleSubmit = () => {
  }


  render() {
    const { classes } = this.props;
    const { to, subject, message } = this.state;

    return (
      <div>

        <ValidatorForm onSubmit={this.handleSubmit}>
          <Grid item xs={12} className={classes.form}>
            <TextValidator
              label='To'
              name='to'
              onChange={this.handleChange}
              value={to}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email is not valid']}
              fullWidth
              placeholder='Enter email address'
            />
          </Grid>
          <br />

          <Grid item xs={12} className={classes.form}>
            <TextField
              name='subject'
              label='Subject'
              onChange={this.handleChange}
              value={subject}
              fullWidth
              placeholder='Enter email subject'
            />
          </Grid>
          <br />

          <Grid item xs={12} className={classes.form}>
            <TextField
              label='Message'
              multiline={true}
              rows={4}
              rowsMax={8}
              value={message}
              name='message'
              onChange={this.handleChange}
              placeholder='Enter message here'
              fullWidth
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