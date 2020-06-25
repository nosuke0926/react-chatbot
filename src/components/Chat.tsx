import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Baby from 'assets/image/akachan_smile.png'
import Philosopher from 'assets/image/nigaoe_socrates.png'

const Chat = (props: any) => {
  const isQuestion = props.type === 'question'
  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse'
  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="Remy Sharp" src={Philosopher} />
        ) : (
          <Avatar alt="Remy Sharp" src={Baby} />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">{props.text}</div>
    </ListItem>
  )
}

export default Chat
