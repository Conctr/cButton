// Packages and Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './theme/globals.css';
import decode from 'jwt-decode';

// Page Components
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import MyDevices from './pages/MyDevices';
import DeviceView from './pages/DeviceView';
import ClaimDevice from './pages/ClaimDevice';
import Profile from './pages/Profile';

// Custom Components
import NavDrawer from './components/NavDrawer';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar } from '@material-ui/core/';

const styles = theme => ({
  root: {
    textAlign: 'left',
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 14
  },
  navBar: {
    flexGrow: 1,
    height: '90px',
  }
});

const checkAuth = () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.log('No token');
    return false;
  }
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
  )} />
);

class App extends Component {

  logout = () => {
    localStorage.clear();

    window.location.href = '/';
  };

  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <div id="root">
          <Grid >
            <AppBar  position="fixed" color="primary" >
              <Toolbar className={classes.navBar} >
                
                {checkAuth() ?
                  <NavDrawer
                    onClick={this.toggle}
                    // color="secondary"
                    logoutHandler={this.logout}
                  />
                  : ''
                }
              </Toolbar>
            </AppBar>
          </Grid>

          <Grid container justify="center" className={classes.root}>

            <Grid item id="content" xs={12} sm={10}>
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={Login} />
                <Route path='/forgotpassword' component={ForgotPassword} />
                <AuthRoute path='/mydevices' component={MyDevices} />
                <AuthRoute path='/deviceview/:id' component={DeviceView} />
                <AuthRoute path='/claimdevice' component={ClaimDevice} />
                <AuthRoute path='/profile' component={Profile} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);