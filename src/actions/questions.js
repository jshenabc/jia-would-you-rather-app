import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'RECEIVE_QUESTIONS'
export const DELETE_ANSWERED_QUESTION = 'DELETE_ANSWERED_QUESTION'
//actionCreators
export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function answerQuestion (authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function deleteAnsweredQuestion (authedUser, qid, answer) {
  return {
    type: DELETE_ANSWERED_QUESTION,
    authedUser,
    qid,
    answer
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
      optionOneText: optionOneInput,
      optionTwoText: optionTwoInput,
    })
      //dispatch addQuestion actions
      .then(( question ) => dispatch(addQuestion(question)))
      //dispatch hideLoading
      .then(() => dispatch(hideLoading()))
  }
}

// export function handleAnswerQuestion({authedUser, qid, answer}) {
//   return (dispatch, getState) => {
//     //get authedUser
//     //const { authedUser } = getState()
//
//     dispatch(showLoading())
//
//     dispatch(answerQuestion({ authedUser, qid, answer }))
//     return saveQuestionAnswer({ authedUser, qid, answer })
//       .catch((e) => {
//         console.warn('error in saveQuestionAnswer')
//         dispatch(deleteAnsweredQuestion({ authedUser, qid, answer }))
//         alert('There was an error submitting the vote, try again')
//       }).then(() => dispatch(hideLoading()))
//   }
// }

export function handleAnswerQuestion(authedUser, qid, answer) {

  return (dispatch) => {
    dispatch(showLoading())
    dispatch(answerQuestion(authedUser, qid, answer))
    return saveQuestionAnswer({ authedUser, qid, answer })
      .catch((e) => {
        console.warn('error in saveQuestionAnswer', e)
        dispatch(deleteAnsweredQuestion(authedUser, qid, answer))
        alert('There was an error submitting the vote, try again')
      }).then(() => dispatch(hideLoading()))
  }
}
