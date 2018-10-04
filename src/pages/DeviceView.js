// Packages
import React, { Component } from 'react';
import moment from 'moment';
import api from '../components/api/api';

// Custom Components
import ActionForm from '../components/ActionForm';
import DeviceViewInfoCard from '../components/DeviceViewInfoCard';
import DeviceChart from '../components/DeviceChart';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';

const styles = theme => ({
  // Custom Styles Go Here
});

class DeviceView extends Component {

  state = {
    device: '',
    allDevices: null,
    historicalData: null,
    chartData: null,
    timePeriod: 14,
    currentAction: null,
  }

  componentDidMount = () => {
    this.getDeviceData();
    this.getHistoricalData();
    this.getCurrentAction();
  }

  getDeviceData = () => {
    const deviceIdParams = this.props.match.params.id;

    api.getDevice(deviceIdParams)
      .then(res => {
        this.setState(() => ({
          device: res.data.data // Api returns data.data? *shrug emoji*
        }));
      })
      .catch(err => {
        console.log(err); // TODO: Handle this error
      });
  }

  getHistoricalData = () => {
    const deviceIdParams = this.props.match.params.id;

    api.getHistoricalDeviceData(deviceIdParams)
      .then(res => {
        this.setState((prevState) => ({
          historicalData: res.data,
          device: {
            ...prevState.device,
            triggerCount: res.data.meta.count
          }
        }));
      })
      .then(() => {
        this.conformData(this.state.historicalData);
      })
      .catch(err => {
        console.log(err); // TODO: Handle this error
      });
  }

  conformData = (historicalData) => {
    // Sort our dataset in timestamp order
    const dataset = historicalData.data.historical.sort((a, b) => {
      return moment(a._ts).diff(moment(b._ts));
    });

    let conformedData = [];

    // Loop through each day for x days backwards, and check for if the dataset
    // matches. Add it to an array index for that day, if so. Count them up.
    for (let i = 0; i < this.state.timePeriod; i++) {

      let triggersToday = dataset.filter((trigger) => {
        return moment(trigger._ts).isSame(moment().subtract(i, 'days'), 'day');
      });

      conformedData[i] = triggersToday.length;
    }

    this.setState(() => ({
      chartData: conformedData.reverse()
    }));
  }

  getCurrentAction = () => {
    const deviceId = this.props.match.params.id;
    const reference = `action_${deviceId}`;

    api.getAction(reference)
      .then(res => {
        this.setState(() => ({ currentAction: res.data }));
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    // const { classes } = this.props; // Uncomment if using custom styles
    return (
      <Grid container id="deviceview" spacing={16}>
        <Grid item id="devicegraph" xs={12} sm={12}>
          <DeviceChart dataset={this.state.chartData} />
        </Grid>

        <Grid item id="deviceinfo" xs={12} sm={6}>
          <DeviceViewInfoCard device={this.state.device} />
        </Grid>

        <Grid item id="deviceactions" xs={12} sm={6}>
          <ActionForm
            currentAction={this.state.currentAction}
            historicalData={this.state.historicalData}
            deviceId={this.props.match.params.id}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DeviceView);