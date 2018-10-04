import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';

// Import MaterialUI theme and global styles from ./injectGlobalRootStyles.js 
import withRoot from './theme/defaultTheme';

const AppWithRoot = withRoot(App);

ReactDOM.render(
  <AppWithRoot />, document.getElementById('root')
);

registerServiceWorker();