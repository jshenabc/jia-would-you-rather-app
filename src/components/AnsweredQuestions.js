import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class AnsweredQuestions extends Component {

  render() {
    return (
      <div>
        <ul >
          {this.props.answeredQuestions.map((id) => (
            <li key={id} className='questionList'>
              <Question id={id} answered={this.props.answered}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }){

  const answeredQuestions = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp-questions[a].timestamp)
    .filter(questionId => questions[questionId].optionOne.votes.includes(authedUser) || questions[questionId].optionTwo.votes.includes(authedUser))
  return {
    answeredQuestions,
    answered: true,
  }
}
export default connect(mapStateToProps)(AnsweredQuestions)
