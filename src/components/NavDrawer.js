import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import LockIcon from '@material-ui/icons/Lock';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

class NavDrawer extends Component {
  state = {
    open: false,
  }
  
  toggle = () => {
    this.setState((prevState) => ({
      open: !prevState.open
    }));
  }

  render() {
    return ([
      <Button key="homebutton"
        id="navButton"
        onClick={this.toggle}
        variant={'fab'}
        color="secondary"
        // style={{ marginTop: '10px' }}

      >
        <Menu color="primary" />
      </Button>, 

      <Drawer key="drawer"
        open={this.state.open}
        width={this.state.width}
        variant="persistent"
      >
        <div id="navCloseButton">
          <Button onClick={this.toggle} variant={'fab'} color="secondary" style={{ marginLeft: '25px', marginTop: '10px', marginBottom: '10px' }}>
            <ChevronLeftIcon color="primary" style={{ fontSize: 30 }} /> 
          </Button>
        </div>

        <div key="2" id="navLogo">
          <img src={require('../theme/logo.png')} alt="Logo" height="90" width="225"/>
        </div>
        
        <div key="3" id="navItems">
          <Link to="/mydevices" onClick={this.toggle} >
            <MenuItem>
              <PowerSettingsNewIcon style={{margin: 10}} /> <span id="itemText">My Devices</span> 
            </MenuItem>        
          </Link>
          <Divider />

          <Link to="/claimdevice" onClick={this.toggle} >
            <MenuItem>
              <LockIcon style={{margin: 10}} /> <span id="itemText">Claim Device</span>
            </MenuItem >
          </Link>
          <Divider />

          <Link to="/profile" onClick={this.toggle} >
            <MenuItem>
              <StarIcon style={{margin: 10}} /> <span id="itemText">My Profile</span>
            </MenuItem>
          </Link>
          <Divider />

          <div onClick={this.toggle}>
            <MenuItem onClick={this.props.logoutHandler}>
              <SendIcon style={{margin: 10}}/> <span id="itemText">Log Out</span>
            </MenuItem>
          </div>
          <Divider/>
          
        </div>
      </Drawer>
    ]);
  }
}

export default NavDrawer;
