// Packages
import React from 'react';
import MyDevicesCard from '../components/MyDevicesCard';
import api from '../components/api/api';
import { Link } from 'react-router-dom';

// Custom Components
import Spinner from '../components/Spinner';

// Material UI Components
import { Grid, Button, Typography, Paper } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  buttonStyle: {
    marginBottom: '20px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    height: '150px'
  },
  spinner: {
    textAlign: 'center'
  }
});

class MyDevices extends React.Component {

  state = {
    devices: null
  }

  componentDidMount() {
    this.getAllDevices();
  }

  getAllDevices = () => {
    api.getAllConsumerDevices()
      .then(res => {
        this.setState({ devices: res.data.data }); // Api returns data.data? *shrug emoji*
      })
      .catch(err => console.error(err));
  }

  render() {
    const classes = this.props.classes;

    let displayDevices;

    // If the API Call comes back with no devices
    if (this.state.devices === []) {
      displayDevices = <Grid item sm={6} xs={12}>
        <Paper className={classes.paper}>
          <Grid container height="150" justify="center" alignItems="center">
            <Typography variant="title">No Devices To Display</Typography>
            <Typography variant="subheading">You currently have no devices registered to your account.</Typography>
            <Typography variant="subheading"><Link to={'/claimdevice'}>Click Here</Link> to claim your device!</Typography>
          </Grid>
        </Paper>
      </Grid>;

    // If the API Call comes back with devices to display 
    } else if (this.state.devices) {
      displayDevices = this.state.devices.map(device => (
        <Grid item sm={4} xs={12} key={device.device_id}>
          <MyDevicesCard  {...device} />
        </Grid>
      ));

    // While the API call is ongoing / error state
    } else {
      displayDevices = <Grid item className={classes.spinner}>
        <div>Loading Devices...<br/>&nbsp;</div>
        <Spinner />
      </Grid>;
    }

    return (
      <div>
        <Grid id='register' container spacing={16} alignItems="center" justify='center'>
          <Link to={'/claimdevice'}>
            <Button variant="contained" color="primary" className={classes.buttonStyle}>Register New Device</Button>
          </Link>
        </Grid>

        <Grid id='devices' container spacing={16} alignItems="center" justify='center'>
          { displayDevices }
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MyDevices);