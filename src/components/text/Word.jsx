import Typography from '@material-ui/core/Typography'
import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const AudioWord = styled(props => <span {...props} />)`
  background: ${({ selected }) => (selected ? '#dae7ff' : 'none')};
`

const Phrase = styled(
  observer(({ src }) => {
    return (
      <Typography component="span">
        <AudioWord selected={src.active}>{src.word}</AudioWord>
        {` `}
      </Typography>
    )
  })
)``

export default Phrase
