import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import format from '../util/formatTime'

const Span = styled(props => <span {...props} />)`
  font-size: 0.9rem;
  color: ${({ theme: { palette } }) => palette.grey['600']};
`

const TimeIndicator = styled(
  observer(({ media: { currentTime, duration }, ...rest }) => (
    <Span {...rest}>{`${format(currentTime)} / ${format(duration)}`}</Span>
  ))
)``

export default TimeIndicator
