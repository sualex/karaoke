import React from 'react'
import styled from 'styled-components'
import Slider from '@material-ui/lab/Slider'
import { observer } from 'mobx-react'

const toProgress = (currentTime, duration) => 100 * (currentTime / duration)

const TimeLine = styled(
  observer(({ onChange, media: { currentTime, duration }, ...rest }) => (
    <Slider
      onChange={onChange}
      // onMouseDown={}
      value={toProgress(currentTime, duration)}
      variant="determinate"
      color="secondary"
      {...rest}
    />
  ))
)``

export default TimeLine
