import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION, SAVE_ANSWER } from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([
            action.question.id
          ])
        }
      };
    case SAVE_ANSWER:
    const { object } = action
      return {
        ...state,
        [action.object.authedUser]: {
          ...state[action.object.authedUser],
          answers: {
            ...state[action.object.authedUser].answers,
            [action.object.qid]: action.object.answer
          }
        }
      };
    default :
      return state
  }
}