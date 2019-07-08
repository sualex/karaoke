import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import { action, observable } from 'mobx'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import PlayButton from './parts/PlayButton'
import TimeLine from './parts/TimeLine'
import TimeIndicator from './parts/TimeIndicator'

@observer
class Audio extends Component {
  api = null

  @observable $media = {
    status: 'loading',
    currentTime: null,
    duration: null
  }

  @action
  onMetadata = ({ target: node }) => {
    const { $media } = this
    this.api = node
    $media.status = 'ready'
  }

  @action
  onCanPlay = e =>
    (e.$api = {
      addTextTrack: this.addTextTrack
    })

  @action
  onDuration = ({ target: { duration } }) => (this.$media.duration = duration)
  @action
  onPlay = () => (this.$media.status = 'playing')
  @action
  onPause = () => (this.$media.status = 'ready')
  @action
  onTime = ({ target: { currentTime } }) => (this.$media.currentTime = currentTime)
  @action
  onSlide = (e, progress) => {
    const currentTime = (progress * this.api.duration) / 100
    if (!isNaN(currentTime)) {
      this.api.currentTime = currentTime
    }
  }

  setApi = audio => {
    this.api = audio
    const { api } = this
    api.onloadedmetadata = this.onMetadata
    api.ondurationchange = this.onDuration
    api.oncanplay = this.onCanPlay
    api.onplay = this.onPlay
    api.onpause = this.onPause
    api.ontimeupdate = this.onTime
  }

  play = () => this.api.play()
  pause = () => this.api.pause()
  addTextTrack = ({ kind = 'metadata', label, language } = {}) => this.api.addTextTrack(kind, label, language)

  controls = ({
    cV = {
      display: 'flex',
      alignItems: 'center'
    },
    root,
    content,
    timelineBox
  }) => (
    <Paper className={root}>
      <Grid container className={content} alignItems="stretch" wrap="nowrap">
        <Box {...cV}>
          <PlayButton play={this.play} pause={this.pause} media={this.$media} />
        </Box>
        <Box {...cV} className={timelineBox} flexGrow={1}>
          <TimeLine onChange={this.onSlide} media={this.$media} />
        </Box>
        <Box {...cV}>
          <TimeIndicator media={this.$media} />
        </Box>
      </Grid>
    </Paper>
  )

  render() {
    const { classes, ...rest } = this.props
    return (
      <Fragment>
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <audio {...rest} ref={this.setApi} controls hidden />
        {this.controls(classes)}
      </Fragment>
    )
  }
}

export default withStyles(() => ({
  root: {
    height: '73px',
    padding: '0 30px',
    minWidth: '740px'
  },
  content: {
    height: '100%'
  },
  timelineBox: {
    padding: '0 28px'
  }
}))(Audio)

Audio.propTypes = {
  src: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired
  }).isRequired
}
