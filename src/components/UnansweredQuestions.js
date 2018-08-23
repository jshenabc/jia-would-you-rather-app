import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class UnansweredQuestions extends Component {

  render() {
    return (
      <div>
        <ul >
          {this.props.unAnsweredQuestions.map((id) => (
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
  let user;
  if ( authedUser && users.hasOwnProperty(authedUser) ) {
    user = users[authedUser]
  }

  const unAnsweredQuestions = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp-questions[a].timestamp)
    .filter(questionId => !questions[questionId].optionOne.votes.includes(authedUser) && !questions[questionId].optionTwo.votes.includes(authedUser))

  return {
    unAnsweredQuestions,
    answered: false,
  }
}
export default connect(mapStateToProps)(UnansweredQuestions)
