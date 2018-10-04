import React from 'react';
import { Link } from 'react-router-dom';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  card: {
    height: '150px',
    color: 'red',
  }
});

function MyDevicesCard( props ) {
  return (
    <Link to={`/deviceview/${props.device_id}`}>
      <Paper className={props.classes.card}>
        <Grid className="mycards" container alignItems="center" justify="center">
          <h3>{ props.name ? props.name : 'Unnamed Device' }</h3>
        </Grid>
      </Paper>
    </Link>
  );
}

export default withStyles(styles)(MyDevicesCard);