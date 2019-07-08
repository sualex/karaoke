import React from 'react'
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'
import Pause from '@material-ui/icons/Pause'
import Play from '@material-ui/icons/PlayArrow'
import { observer } from 'mobx-react'

const PlayButton = styled(
  observer(({ play, pause, media: { status }, ...rest }) => {
    function onClick() {
      if (status === 'ready') {
        play()
      } else {
        pause()
      }
    }

    return (
      <Fab size="small" color="primary" onClick={onClick} {...rest}>
        {
          {
            ready: <Play />,
            playing: <Pause />
          }[status]
        }
      </Fab>
    )
  })
)`
  && {
    // remove ALL the shadows
    box-shadow: none;
  }
`

export default PlayButton
