import React, { useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import { Dialog } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextInput from 'components/forms/TextInput'

// interface Props {
//   handleClose: () => void
//   open: boolean
// }

const FormDialog = (props: any) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const inputName = useCallback(
    (event: any) => {
      setName(event.target.value)
    },
    [setName],
  )

  const inputEmail = (event: any) => {
    setEmail(event.target.value)
  }
  const inputDescription = (event: any) => {
    setDescription(event.target.value)
  }

  // 空白バリデーション
  const validateRequiredInput = (...args: [string, string, string]) => {
    let isBlank = false
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '') {
        isBlank = true
      }
    }
    return isBlank
  }

  // Slackに問い合わせを通知する
  const submitForm = () => {
    const isBlank = validateRequiredInput(name, email, description)

    if (isBlank) {
      alert('必須入力欄が空白です')
    } else {
      const payload = {
        text:
          'お問い合わせがありました\n' +
          'お名前: ' +
          name +
          '\n' +
          'Email: ' +
          email +
          '\n' +
          '問い合わせ内容:\n' +
          description,
      }
      const url =
        'https://hooks.slack.com/services/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'

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
      }).then(() => {
        alert('送信が完了しました。\n追ってご連絡いたします。')

        // フォーム初期化
        setName('')
        setEmail('')
        setDescription('')

        return props.handleClose()
      })
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={'お名前（必須）'}
          multiline={false}
          rows={1}
          value={name}
          type={'text'}
          onChange={inputName}
        />
        <TextInput
          label={'メールアドレス（必須）'}
          multiline={false}
          rows={1}
          value={email}
          type={'text'}
          onChange={inputEmail}
        />
        <TextInput
          label={'お問い合わせ内容（必須）'}
          multiline={true}
          rows={5}
          value={description}
          type={'text'}
          onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
