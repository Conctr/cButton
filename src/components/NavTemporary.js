import React from 'react';
import { Link } from 'react-router-dom';

// Material UI Components
import Grid from '@material-ui/core/Grid';

function TemporaryNav( props ) {
  return (
    <Grid item id="temporaryNavbar" sm={12}>
      <Grid container justify="center" spacing={16}>
        <Grid item sm={1}><Link to="/"><p>Landing</p></Link></Grid>
        <Grid item sm={1}><Link to="/signup"><p>Sign Up</p></Link></Grid>
        <Grid item sm={1}><Link to="/login"><p>Login</p></Link></Grid>
        <Grid item sm={1}><Link to="/forgotpassword"><p>Forgot Pwd</p></Link></Grid>
        <Grid item sm={1}><Link to="/mydevices"><p>My Devices</p></Link></Grid>
        <Grid item sm={1}><Link to="/deviceview"><p>Device View</p></Link></Grid>
        <Grid item sm={1}><Link to="/claimdevice"><p>Claim Device</p></Link></Grid>
        <Grid item sm={1}><Link to="/profile"><p>Profile</p></Link></Grid>
      </Grid>
    </Grid>
  );
}

export default TemporaryNav;