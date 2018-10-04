// This container holds the Chart.js
import React from 'react';

// Custom Components
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core/';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  spinner: {
    textAlign: 'center'
  }
});

class DeviceChart extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>

        {this.props.dataset
          ?
          <Chart dataset={this.props.dataset} />
          :
          <Grid container justify="center" alignItems="center">
            <Grid item className={classes.spinner}>
              <div>Loading Graph...<br />&nbsp;</div>
              <Spinner />
            </Grid>
          </Grid>
        }

      </Paper>
    );
  };
}

export default withStyles(styles)(DeviceChart);