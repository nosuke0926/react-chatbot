import React from 'react'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const TextInput = (props: any) => {
  return (
    <TextField
      fullWidth={true}
      id="standard-basic"
      label={props.label}
      margin={'dense'}
      multiline={props.multiline}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput
