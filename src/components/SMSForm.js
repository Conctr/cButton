import React, { Component } from 'react';

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

class SMSForm extends Component {

  state = {
    action: '',
    to: '',
    message: ''
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  updateAction = () => {

  }

  render() {
    const { classes } = this.props;
    const { to, message } = this.state;

    return (

      <div>
        <ValidatorForm onSubmit={this.handleFormSubmit}>
          <Grid item xs={12} className={classes.form}>
            <TextValidator
              label='To'
              name={'to'}
              onChange={this.handleChange}
              value={to}
              validators={['required', 'isNumber']}
              errorMessages={['This field is required', 'Phone number is not valid']}
              fullWidth
              placeholder='Enter receiving phone number'
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
              name={'message'}
              onChange={this.handleChange}
              placeholder='Enter message here'
              fullWidth
            />
          </Grid>
        </ValidatorForm>
        <br />

        <CardActions style={{ justifyContent: 'flex-end', marginRight: -30, marginBottom: -20 }}>
          <Button onClick={this.updateAction} variant='contained' color='primary'>Update</Button>
        </CardActions>

      </div>

    );
  }
}

export default withStyles(styles)(SMSForm);