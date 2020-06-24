import React from 'react'
import defaultDataset from 'dataset'
import 'assets/styles/style.css'

interface Props {
  answers: Array<object>
  chats: Array<object>
  currentId: String
  dataset: object
  open: boolean
}

interface State {}

export default class App extends React.Component<State, Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: false,
    }
  }
  render() {
    return (
      <section className="c-section">
        <div className="c-box">{this.state.currentId}</div>
      </section>
    )
  }
}
