/* 
This is the DeviceView info section. For the most part a boring, stateless
component, though it does pass through the axios patch function to the
EditableField component.
*/
import React from 'react';
import moment from 'moment';
import api from '../components/api/api';

// Custom Components
import EditableField from './EditableField';
import RemoveDeviceAlert from './RemoveDeviceAlert';
import Spinner from '../components/Spinner';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core/';

const styles = (theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit
  },
  spinner: {
    textAlign: 'center'
  }
});

class DeviceViewInfoCard extends React.Component {
  nameUpdate = (name) => {
    const payload = {
      new_name: name
    };

    return api.updateDevice(this.props.device.id, payload);
  };

  render() {
    const classes = this.props.classes;

    return (
      <Card className={this.props.classes.card}>
        {this.props.device
          ?
          [
            <CardContent key="card">
              <Typography variant="title" style={{ fontWeight: 'bolder' }}>
                <EditableField
                  data={this.props.device.name ? this.props.device.name : 'Unnamed Device'}
                  updateHandler={this.nameUpdate} />
              </Typography>
              <br />
              <Typography variant="body1" style={{ fontWeight: 'bolder' }}  >Device ID:</Typography>
              <span id="devicename">{this.props.device.id}</span>
              <br /><br />
              <Typography variant="body1" style={{ fontWeight: 'bolder' }}  >Last Triggered:</Typography>
              <span id="devicename">{moment(this.props.device.last_online).format('MMMM Do YYYY, h:mm:ss a')}</span>
              <br /><br />
              <Typography variant="body1" style={{ fontWeight: 'bolder' }}  >Total Triggers:</Typography>
              <span id="devicename">{this.props.device.triggerCount ? this.props.device.triggerCount : 0}</span>
            </CardContent>,

            <CardActions key="actions" style={{ justifyContent: 'flex-end', marginTop: 'auto' }}>
              <RemoveDeviceAlert />
            </CardActions>
          ]
          :
          <CardContent>
            <Grid item className={classes.spinner}>
              <div>Loading Devices...<br />&nbsp;</div>
              <Spinner />
            </Grid>;
          </CardContent>
        }

      </Card>
    );
  };
}

export default withStyles(styles)(DeviceViewInfoCard);