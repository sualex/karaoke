import React from 'react'
import List from '@material-ui/core/List'
import { observer } from 'mobx-react'
import Card from '@material-ui/core/Card'
import { CardHeader } from '@material-ui/core'
import MUIDivider from '@material-ui/core/Divider'
import MUICardContent from '@material-ui/core/CardContent'
import styled from 'styled-components'
import Phrase from './Phrase'

const Header = styled(props => <CardHeader classes={{ title: 'title', subheader: 'subheader' }} {...props} />)`
  padding: 0 32px;
  & .title,
  .subheader {
    font-size: 24px;
    font-style: normal;
    font-weight: normal;
    font-stretch: normal;
    line-height: 100%;
  }
  & .title {
    padding: 37px 0 0;
    font-weight: 600;
  }
  & .subheader {
    padding: 20px 0;
    font-size: 0.9rem;
    color: ${({ theme: { palette } }) => palette.grey['600']};
  }
`
const PhraseList = styled(props => <List classes={{}} {...props} />)`
  padding: 0;
`
const Divider = styled(props => <MUIDivider classes={{}} {...props} />)`
  margin: 0 32px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.03);
`
const CardContent = styled(props => <MUICardContent classes={{}} {...props} />)`
  //&:last-child {
  //  padding-bottom: 16px;
  //}
`

const Text = styled(
  observer(({ title, subtitle, src }) => {
    return (
      <Card>
        <Header title={title} subheader={subtitle} />
        <Divider light />
        <CardContent>
          <PhraseList>
            {src && src.map(({ timeStart, words }, i) => <Phrase key={i} timeStart={timeStart} src={words} />)}
          </PhraseList>
        </CardContent>
      </Card>
    )
  })
)``

export default Text
