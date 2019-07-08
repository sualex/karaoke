import React from 'react'
import { observer } from 'mobx-react'
import MUIListItem from '@material-ui/core/ListItem'
import MUIListItemAvatar from '@material-ui/core/ListItemAvatar'
import MUIAvatar from '@material-ui/core/Avatar'
import MUIListItemText from '@material-ui/core/ListItemText'
import PersonIcon from '@material-ui/icons/PersonOutline'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import formatTime from '../audio/util/formatTime'
import Word from './Word'

const Avatar = styled(props => <MUIAvatar classes={{ colorDefault: 'colorDefault' }} {...props} />)`
  width: 32px;
  height: 32px;
  color: ${({ theme: { palette } }) => palette.grey['500']};
  background-color: #dae7ff;
`
const ListItemAvatar = styled(props => (
  <MUIListItemAvatar classes={{ alignItemsFlexStart: 'alignItemsFlexStart' }} {...props} />
))`
  min-width: 50px;
  margin-top: 10px;
`
const ListItemText = styled(props => <MUIListItemText classes={{}} {...props} disableTypography />)`
  display: flex;
  flex-direction: column;
`
const ListItem = styled(props => <MUIListItem classes={{ gutters: 'gutters' }} {...props} />)`
  padding-right: 64px;
`
const StartTime = styled(props => {
  return <Typography classes={{}} {...props} />
})`
  font-size: 0.9rem;
  color: ${({ theme: { palette } }) => palette.grey['600']};
  margin-bottom: 0.7rem;
  line-height: 100%;
`
const PhraseText = styled(props => {
  return <Typography classes={{}} {...props} />
})`
  font-size: 1rem;
  color: ${({ theme: { palette } }) => palette.grey['900']};
  line-height: 100%;
`

const Phrase = styled(
  observer(({ timeStart, src }) => {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<StartTime>{formatTime(timeStart)}</StartTime>}
          secondary={
            <PhraseText>
              {src.map(word => (
                <Word key={word.id} src={word} />
              ))}
            </PhraseText>
          }
        />
      </ListItem>
    )
  })
)``

export default Phrase
