import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import { Chat } from 'components/index'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
)

const Chats = (props: any) => {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {props.chats.map(
        (chat: { text: string; type: string }, index: number) => {
          return <Chat text={chat.text} type={chat.type} key={index.toString} />
        },
      )}
    </List>
  )
}

export default Chats
