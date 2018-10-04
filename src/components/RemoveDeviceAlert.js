import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RemoveDeviceAlert extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="contained" color="secondary">Remove</Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are you sure you want to remove this device?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Removing this device from your account will permanently delete it and it will not be able to be re-activated on this account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Oops! No! Don't remove it!
            </Button>
            <Button onClick={this.handleClose} color="default">
              Yes, please remove.
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RemoveDeviceAlert;