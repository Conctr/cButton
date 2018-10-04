import React, { Component } from 'react';

/* Import Components */
import { FormControl, FormHelperText, MenuItem, Select, Grid, Card, CardContent, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import EmailForm from './EmailForm';
import SMSForm from './SMSForm';
import HttpForm from './HttpForm';

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

class ActionForm extends Component {
  state = {
    value: '',
    ses: {
      to: '',
      subject: '',
      message: ''
    },
    http_request: {
      url: ''
    }
  }

  UNSAFE_componentWillReceiveProps = () => {
    if (this.props.currentAction && this.props.historicalData) {
      this.getActionType();
    }
  }

  getActionType = () => {
    if (this.props.currentAction) {
      let data = this.props.currentAction.data;
      let actionType = data[data.length - 1].type;
      this.setFormFields(actionType);
    } else {
      console.log('No currentAction Found');
    }
  }

  setFormFields = (actionType) => {
    if (actionType === 'ses') {
      let data = this.props.currentAction.data;
      this.setState(() => ({
        ses: {
          to: data[data.length - 1].config.to,
          subject: data[data.length - 1].config.subject,
          message: this.props.historicalData.data.current._data.body
        },
        value: 'ses'
      }));

    } else if (actionType === 'http_request') {
      let data = this.props.currentAction.data;

      this.setState(() => ({
        http_request: {
          url: data[data.length - 1].config.url
        },
        value: 'http_request'
      }));

    } else if (actionType === 'sms') {
      this.setState(() => ({
        value: 'sms'
      }));
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
  }

  change = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    let selection;
    if (this.state.value === 'ses') {
      selection = <EmailForm
        deviceId={this.props.deviceId}
        to={this.state.ses.to}
        subject={this.state.ses.subject}
        message={this.state.ses.message}
      />;

    } else if (this.state.value === 'http_request') {
      selection = <HttpForm
        deviceId={this.props.deviceId}
        url={this.state.http_request.url}
      />;

    } else if (this.state.value === 'sms') {
      selection = <SMSForm />;
    }

    return (
      <Card className={this.props.classes.card} spacing={12}>
        <CardContent>
          <Typography variant='title'>Action Editor</Typography>
          <br />
          <Grid item xs={12} className={classes.form}>
            <FormControl className={classes.formControl}>
              <Select onChange={this.change} value={this.state.value}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value='' disabled>
                  Select Action
                </MenuItem>
                <MenuItem value={'ses'}>Email</MenuItem>
                <MenuItem value={'http_request'}>Http Request</MenuItem>
                <MenuItem value={'sms'}>SMS</MenuItem>
              </Select>
              <FormHelperText>Select Action</FormHelperText>
            </FormControl>
            <div>{selection}</div>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}


export default withStyles(styles)(ActionForm);