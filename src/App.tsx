import React, { useState, useEffect, useCallback } from 'react'
import 'assets/styles/style.css'
import { AnswersList, Chats } from 'components/index'
import FormDialog from 'components/forms/FormDialog'
import { db } from 'firebase/index'

// interface Props {
//   answers: object[]
//   chats: object[]
//   currentId: string
//   dataset: any
//   open: boolean
// }

// interface State {}

const App = () => {
  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState<object[]>([])
  const [currentId, setCurrentId] = useState('init')
  const [dataset, setDataset] = useState<{ [key: string]: {} }>({})
  const [open, setOpen] = useState(false)

  const displayNextQuestion = (nextQuestionId: string, nextDataset: any) => {
    addChats({
      text: nextDataset.question,
      type: 'question',
    })

    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
    switch (true) {
      case nextQuestionId === 'contact':
        handleClickOpen()
        break

      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a')
        a.href = nextQuestionId
        a.target = '_blank'
        a.click()
        break

      default:
        addChats({
          text: selectedAnswer,
          type: 'answer',
        })

        // 返事を遅らせて、会話感を出す
        setTimeout(() => {
          displayNextQuestion(nextQuestionId, dataset[nextQuestionId])
        }, 500)

        break
    }
  }

  const addChats = useCallback(
    (chat: any) => {
      setChats((prevChats) => {
        return [...prevChats, chat]
      })
    },
    [setChats],
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  // useEffectの第二引数が空の配列の場合は、componentDidiMountと同じ
  useEffect(() => {
    // async付きの即時関数を使用して、非同期処理を制御
    ;(async () => {
      const initDataset: any = {}
      await db
        .collection('questions')
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id // 'init'などを指す
            const data = doc.data() // 'init'の中のデータ（answers,questionsを指す）
            initDataset[id] = data
          })
        })
      setDataset(initDataset)

      // stateの更新は即時ではない（ちょっと時間がかかる）。
      // だからdatasetではなく直前でfirestoreから取得したinitDatasetを渡す
      displayNextQuestion(currentId, initDataset[currentId])
    })()
  }, [])

  // componentDidUpdateは毎回走って欲しいので、第二引数は指定しない
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area')
    // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  )
}

export default App
