import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import { Chat } from 'components/index'

const useStyles = makeStyles(() =>
  createStyles({
    chats: {
      height: 400,
      padding: 0,
      overflow: 'auto',
    },
  }),
)

const Chats = (props: any) => {
  const classes = useStyles()

  return (
    <List className={classes.chats}>
      {props.chats.map(
        (chat: { text: string; type: string }, index: number) => {
          return <Chat text={chat.text} type={chat.type} key={index.toString} />
        },
      )}
    </List>
  )
}

export default Chats
