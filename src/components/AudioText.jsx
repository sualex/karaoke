import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import { action, computed, flow, observable, runInAction } from 'mobx'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Audio from './audio/Audio'
import Text from './text/Text'
import formatTime from './audio/util/formatTime'

@observer
class AudioText extends Component {
  @observable $selected = {
    audio: null,
    text: []
  }

  @computed
  get leftActive() {
    return (
      this.$selected.text
        .map(({ words }) => words)
        // .flat()
        .reduce((a, b) => a.concat(b), [])
        .filter(({ active }) => active)
    )
  }

  @action
  onCueEnter = ({ target: { id } }) => {
    const { text } = this.$selected
    const a = id.split('.')
    text[a[0]].words[a[1]].active = true
  }

  @action
  onCueExit = () => {
    // Chrome processes exit correctly even when current playback time is being changed explosively by slider
    // FireFox does not though. So we need to track words left active and manually deactivate
    this.leftActive.forEach(word => {
      const { timeStart, timeEnd } = word
      const delta = timeEnd - timeStart
      // not enough time to spot highlight, differ a bit (fading tail)
      if (delta < 0.25) {
        setTimeout(() => runInAction(() => (word.active = false)), 100)
      } else {
        word.active = false
      }
    })
  }

  @action
  selectTrack = flow(function*(index) {
    // entry point
    const files = this.props.src[index]
    const [audioFileName, textFileName] = files
    const { $selected } = this
    try {
      // get actual audio url (hardcoded root)
      const { default: url } = yield import('../data/' + audioFileName)
      const audioElement = yield new Promise((resolve, reject) => {
        // force <audio> render having an url
        $selected.audio = {
          fileName: audioFileName,
          duration: null,
          url,
          resolve,
          reject
        }
      })
      $selected.audio.duration = audioElement.duration
      // <audio> is ok
      // get actual transcript url
      const { default: phrases } = yield import('../data/' + textFileName)
      const textTrack = audioElement.addTextTrack('captions', 'sample')
      $selected.text = phrases.map(({ words, ...rest }, group) => ({
        ...rest,
        words: words.map((word, index) => ({
          id: `${group}.${index}`,
          active: false,
          group,
          ...word
        }))
      }))
      $selected.text
        .map(({ words }) => words)
        .reduce((a, b) => a.concat(b), [])
        .map(({ id, timeStart, timeEnd, word }) => {
          const cue = new VTTCue(timeStart, timeEnd, word)
          cue.id = id
          cue.onenter = this.onCueEnter
          cue.onexit = this.onCueExit
          return cue
        })
        .forEach(cue => textTrack.addCue(cue))
    } catch (e) {
      console.log(e)
    }
  })

  componentDidMount() {
    this.selectTrack(0)
  }

  render() {
    const {
      classes: { root, row }
    } = this.props
    const { $selected } = this
    return (
      <Grid className={root}>
        {$selected.audio ? (
          <Fragment>
            <Grid item className={row}>
              <Text
                title={$selected.audio.fileName}
                subtitle={formatTime($selected.audio.duration)}
                src={$selected.text}
              />
            </Grid>
            <Grid item container justify="center" className={row}>
              <Audio
                src={$selected.audio.url}
                onCanPlay={({ nativeEvent: { target } }) => $selected.audio.resolve(target)}
                onError={({ nativeEvent: { target } }) => $selected.audio.reject(target)}
              />
            </Grid>
          </Fragment>
        ) : (
          <Grid item className={row}>
            <CircularProgress color="secondary" />
          </Grid>
        )}
      </Grid>
    )
  }
}

export default withStyles(() => ({
  root: {
    maxWidth: '806px'
  },
  row: {
    paddingTop: '40px'
  }
}))(AudioText)

AudioText.propTypes = {
  src: PropTypes.array,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    row: PropTypes.string.isRequired
  }).isRequired
}
