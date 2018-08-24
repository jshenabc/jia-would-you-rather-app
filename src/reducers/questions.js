import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION, DELETE_ANSWERED_QUESTION } from '../actions/questions'


export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        //merge state
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id] : action.question,
      }
    case ANSWER_QUESTION : {
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    }
    case DELETE_ANSWERED_QUESTION : {
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.filter(user => user !== [action.authedUser])
          }
        }
      }
    }
    default:
      return state
  }
}
