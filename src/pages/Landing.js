// Packages
import React, { Component } from 'react';

// Custom Components
// import TestComponent from '../components/TestComponent'; // TODO: Remove this example

// Material UI Components
import { Button, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: '20px',
    width: '200px',
    height: '50px',
    color: 'white',
    background: '#666CAB'
  },
  logo: {
    marginTop: '20px',
    marginBottom: '20px', 
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class Landing extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root}>
        <Grid container spacing={16} alignItems='center' justify ='center' className={classes.container} >
          <Paper className={classes.paper}>

            <Grid item xs={12} sm={12} >
              <div>
                <img className={classes.logo} src={require('../theme/logo.png')} alt="Logo" height="89" width="225" />
              </div>
            </Grid>
          
            <Grid item xs={6} sm={6} >
              <Button variant="contained" href ='/signup' className={classes.button}>create account</Button>
            </Grid>

            <Grid item xs={6} sm={6} >
              <Button variant="contained" href ='/login' className={classes.button}>sign in</Button>
            </Grid>

          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Landing);