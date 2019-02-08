import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      const { question } = action

      return {
        ...state,
        [action.question.id]: action.question,
      }
    case SAVE_ANSWER :
      const { object } = action
      console.log(action.object.authedUser)
      console.log(state[action.object.authedUser])
      return {
        ...state,
        [action.object.qid]: {
          ...state[action.object.qid],
          [action.object.answer]: {
            ...state[action.object.qid][action.object.answer],
            votes: [
              ...state[action.object.qid][action.object.answer].votes,
              action.object.authedUser
            ]
          }
        }
      }
      
    default :
      return state
  }
}