import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'


//actionCreators
export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneInput, optionTwoInput) {
  return (dispatch, getState) => {
    //get authedUser
    const { authedUser } = getState()
    //dispatch showLoading
    dispatch(showLoading())
    //return API
    return saveQuestion({
      author: authedUser,
      optionOneInput,
      optionTwoInput,
    })
      //dispatch addQuestion actions
      .then(( question ) => dispatch(addQuestion(question)))
      //dispatch hideLoading
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
