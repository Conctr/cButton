/*
This file is used to inject the global 'Theme' into the root of the project.The documentation for how to work with this can be found in the MaterialUI docs at https://material-ui.com/customization/themes/
*/

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Global Theme Setup: Configure your own values here to inject into MaterialUI
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#676aB0' // CONCTR 'Purple'
    },
    secondary: {
      main: '#f16265' // CONCTR 'Red'
    },
    background: {
      default: '#e3e6ea' // CONCTR 'Grey'
    }
  },
  spacing: {
    unit: 8
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;