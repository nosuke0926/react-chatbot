import React from 'react'
import Button from '@material-ui/core/Button'
import { Dialog } from '@material-ui/core'
// import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextInput from 'components/forms/TextInput'

interface Props {
  handleClose: () => void
  open: boolean
}

interface State {
  name: string
  email: string
  description: string
}

export default class FormDialog extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: '',
      email: '',
      description: '',
    }

    this.inputName = this.inputName.bind(this)
    this.inputEmail = this.inputEmail.bind(this)
    this.inputDescription = this.inputDescription.bind(this)
  }

  inputName = (event: any) => {
    this.setState({
      name: event.target.value,
    })
  }

  inputEmail = (event: any) => {
    this.setState({
      email: event.target.value,
    })
  }
  inputDescription = (event: any) => {
    this.setState({
      description: event.target.value,
    })
  }

  // 空白バリデーション
  validateRequiredInput = (...args: [string, string, string]) => {
    let isBlank = false
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '') {
        isBlank = true
      }
    }
    return isBlank
  }

  // Slackに問い合わせを通知する
  submitForm = () => {
    const name = this.state.name
    const email = this.state.email
    const description = this.state.description

    const isBlank = this.validateRequiredInput(name, email, description)

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
        this.setState({
          name: '',
          email: '',
          description: '',
        })
        return this.props.handleClose()
      })
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        <DialogContent>
          <TextInput
            label={'お名前（必須）'}
            multiline={false}
            rows={1}
            value={this.state.name}
            type={'text'}
            onChange={this.inputName}
          />
          <TextInput
            label={'メールアドレス（必須）'}
            multiline={false}
            rows={1}
            value={this.state.email}
            type={'text'}
            onChange={this.inputEmail}
          />
          <TextInput
            label={'お問い合わせ内容（必須）'}
            multiline={true}
            rows={5}
            value={this.state.description}
            type={'text'}
            onChange={this.inputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitForm} color="primary" autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
