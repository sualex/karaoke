import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core';
import mockup from './themes/mockup';
import Root from './components/Root';

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(mockup)}>
    <CssBaseline />
    <Root />
  </MuiThemeProvider>,
  document.getElementById('root')
);
