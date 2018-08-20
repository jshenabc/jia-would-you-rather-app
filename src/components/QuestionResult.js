import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionResult extends Component {
  render() {
    const { id} = this.props
    return (
      <div>
      </div>
    )
  }
}


function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id]
  //get all answers from authedUser
  let authedUserAnswers = users[authedUser].answers
  let authedUserVote, OptOneVotesLength, OptTwoVotesLength, OptOnePercentage, OptTwoPercentage

  //if authedUser replied to this question, we got his vote for this question
  if (authedUserAnswers.hasOwnProperty(question.id)) {
     authedUserVote = authedUserAnswers[question.id]
   }

   OptOneVotesLength = question.optionOne.votes.length
   OptTwoVotesLength =  question.optionTwo.votes.length
   OptOnePercentage = OptOneVotesLength/(OptOneVotesLength + OptTwoVotesLength) * 100
   OptTwoPercentage = 100 - OptOnePercentage
  return {
    authedUser,
    question,
    authedUserVote,
    OptOnePercentage,
    OptTwoPercentage,
    totalVotes: OptOneVotesLength + OptTwoVotesLength,
  }
}

export default connect(mapStateToProps)(QuestionResult)
