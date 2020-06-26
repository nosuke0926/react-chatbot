import React from 'react'
import 'assets/styles/style.css'
import { AnswersList, Chats } from 'components/index'
import FormDialog from 'components/forms/FormDialog'
import { db } from 'firebase/index'

interface Props {
  answers: object[]
  chats: object[]
  currentId: string
  dataset: any
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
      dataset: {},
      open: false,
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
  }

  displayNextQuestion = (nextQuestionId: string) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question',
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    })
  }

  selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
    switch (true) {
      case nextQuestionId === 'init':
        setTimeout(() => {
          this.displayNextQuestion(nextQuestionId)
        }, 500)
        break

      case nextQuestionId === 'contact':
        this.handleClickOpen()
        break

      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a')
        a.href = nextQuestionId
        a.target = '_blank'
        a.click()
        break

      default:
        const chats = this.state.chats
        chats.push({
          text: selectedAnswer,
          type: 'answer',
        })
        this.setState({ chats: chats })

        // 返事を遅らせて、会話感を出す
        setTimeout(() => {
          this.displayNextQuestion(nextQuestionId)
        }, 500)

        break
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  initDataset = (dataset: object) => {
    this.setState({
      dataset: dataset,
    })
  }

  componentDidMount() {
    // async付きの即時関数を使用して、非同期処理を制御
    return (async () => {
      const dataset = this.state.dataset
      await db
        .collection('questions')
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id // 'init'などを指す
            const data = doc.data() // 'init'の中のデータ（answers,questionsを指す）
            dataset[id] = data
          })
        })

      this.initDataset(dataset)
      const initAnswer = ''
      this.selectAnswer(initAnswer, this.state.currentId)
    })()
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area')
    // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    )
  }
}
