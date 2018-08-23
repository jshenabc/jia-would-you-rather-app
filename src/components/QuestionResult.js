import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Card, CardHeader, CardBody,
  CardTitle, CardText, Progress } from 'reactstrap';

class QuestionResult extends Component {
  render() {
    const { users, question, authedUserVote, OptOnePercentage, OptTwoPercentage, OptOneVotesLength, OptTwoVotesLength } = this.props
    const { optionOne, optionTwo, author } = question
    //console.log(authedUserVote)
    return (
      <div>
        <Card>
          <CardHeader>
            <img
              src={users[author].avatarURL}
              alt={`Avator of ${users[author].name}`}
              className='avatar'
            />
          Asked by {users[author].name}
          </CardHeader>
          <CardBody>
            <ul >
                <li className='questionList'>
                    <Card className='resultCard' body style={{ backgroundColor: `${authedUserVote === 'optionOne' ? '#1aedaa': 'lightgrey'} `}}>
                      <CardTitle>{optionOne.text}</CardTitle>
                      {authedUserVote === 'optionOne' && <span className='yourVote'>Your vote</span>}
                      <div className="text-center">{OptOnePercentage}%</div>
                      <Progress className='progressBar' value={OptOnePercentage} />
                      <CardText className='newQuestionHeader'>{`${OptOneVotesLength} of ${OptOneVotesLength+OptTwoVotesLength} votes`}</CardText>
                    </Card>
                </li>
                <li className='questionList'>
                  <Card className='resultCard' body style={{ backgroundColor: `${authedUserVote === 'optionTwo' ? '#1aedaa': 'lightgrey'} `}}>
                    <CardTitle>{optionTwo.text}</CardTitle>
                    {authedUserVote === 'optionTwo' && <span className='yourVote'>Your vote</span>}
                    <div className="text-center">{OptTwoPercentage}%</div>
                    <Progress className='progressBar' value={OptTwoPercentage} />
                    <CardText className='newQuestionHeader'>{`${OptTwoVotesLength} of ${OptOneVotesLength+OptTwoVotesLength} votes`}</CardText>
                  </Card>
                </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    )
  }
}


function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params
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
    users,
    question,
    authedUserVote,
    OptOnePercentage,
    OptTwoPercentage,
    OptOneVotesLength,
    OptTwoVotesLength,
  }
}

export default connect(mapStateToProps)(QuestionResult)
