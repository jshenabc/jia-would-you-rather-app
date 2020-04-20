import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import QuestionResult from './QuestionResult'
import VotePage from './VotePage'

function QuestionPage(props) {
  const { id, questions, hasAnswer } = props;
  const question = questions[id];
  console.log(id,question);
  if(question == null || typeof question === "undefined") {
    return <Redirect to='/no-match' />
  }

  return (
        <div>
          {question &&
            hasAnswer ? <QuestionResult match={{params: {id: id}}} /> : <VotePage match={{params: {id: id}}} />
          }
        </div>
  );
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const question = questions[id]

  if(question == null || typeof question === "undefined") {
    return {
      id,
      questions
    };
      //console.log(id + question);
  }
  //get all answers from authedUser
  let authedUserAnswers = users[authedUser].answers
  let hasAnswer
  //if authedUser replied to this question, we got his vote for this question
  if (authedUserAnswers.hasOwnProperty(question.id)) {
     hasAnswer = true
   }else {
     hasAnswer = false
   }
  return {
    id,
    questions,
    hasAnswer,
  };
}

export default connect(mapStateToProps)(QuestionPage);
