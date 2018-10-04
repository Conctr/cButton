/*
This component is used to render an editable field. It takes two attributes:
1) 'data' - the data to initially display in the field
2) 'updateHandler' - a handler function to be passed through on update - updateHandler must return a promise - returning an axios patch method is how we are using it. It will console-log the error if the promise fails to resolve. This keeps the component reusable.
*/

import React from 'react';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import { IconButton, TextField, Grid } from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

const styles = (theme) => ({
  button: {
    height: 32,
    width: 32
  },
  icon: {
    height: 24,
    width: 24
  }
});

class EditableField extends React.Component {
  state = {
    data: this.props.data ? this.props.data : '',
    editing: false,
    error: false,
    errorMsg: null
  }

  handleEdit = () => {
    this.setState(() => ({
      editing: true
    }));
  };

  handleUpdate = () => {
    this.setState(() => ({
      storedData: this.state.data
    }));

    this.props.updateHandler(this.state.data)
      .then(() => {
        this.setState(() => ({
          editing: false,
          error: false,
          errorMsg: null
        }));
      })
      .catch((err) => {
        console.log(err);
        this.setState(() => ({
          error: true,
          errorMsg: 'Whoops! An error ocurred' 
        }));  
      });

  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          { this.state.editing 
            ? <TextField
              name="data"
              error={this.state.error}
              label={this.state.errorMsg}
              onChange={this.handleChange}
              value={this.state.data}
              fullWidth
              required
            />
            : <span id="editableField">{this.state.data}</span>
          }
        </Grid>
        <Grid item>
          { this.state.editing 
            ? <IconButton className={classes.button} variant="contained" onClick={this.handleUpdate}>
              <DoneIcon className={classes.icon}/>
            </IconButton>
            : <IconButton className={classes.button} variant="contained" onClick={this.handleEdit}>
              <EditIcon className={classes.icon}/>
            </IconButton>
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(EditableField);
