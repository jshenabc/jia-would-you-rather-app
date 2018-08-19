import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class UnansweredQuestions extends Component {

  render() {
    return (
      <div>
        <ul >
          {this.props.questionIds.map((id) => (
            <li key={id} className='questionList'>
              <Question id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }){
  return {
    questionIds : Object.keys(questions)
      .sort((a,b) => questions[b].timestamp-questions[a].timestamp)
  }
}
export default connect(mapStateToProps)(UnansweredQuestions)
