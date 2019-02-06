import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

function saveAnswer (object) {
  return {
    type: SAVE_ANSWER,
    object,
  }
}

export function handleSaveAnswer (object) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    console.log(authedUser)
    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid: object.id,
      answer: object.answer
    })
      .then((object) => dispatch(saveAnswer(object)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions,
    }
  }