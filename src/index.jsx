import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider } from '@material-ui/styles'
import * as mobx from 'mobx'
import Grid from '@material-ui/core/Grid'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import AudioText from './components/AudioText'
import theme from './theme'

mobx.configure({ enforceActions: 'observed' })
// audio-text pairs
const tracks = [['audio.wav', 'transcript.json']]

ReactDOM.render(
  <StylesProvider injectFirst>
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Grid justify="center" container>
          <AudioText src={tracks} />
        </Grid>
      </MuiThemeProvider>
    </StyledThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
)
