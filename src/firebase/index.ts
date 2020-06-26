import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from 'firebase/config'

// 自分のfirebaseプロジェクトの設定値を使ってfirebaseアプリを初期化する
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
