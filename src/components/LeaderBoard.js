import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardFooter, CardBody, CardText, Badge } from 'reactstrap';

class LeaderBoard extends Component {

  render() {
    const { SortedLeaderBoardDataSet, authedUser } = this.props
    return (
      <div>
        <ul >
          {SortedLeaderBoardDataSet.map((data) => (
            <li key={data.id} className='questionList'>
              <Card>
                <CardHeader tag="h5">
                  <img
                    src={data.avatarURL}
                    alt={`Avator of ${data.name}`}
                    className='avatar'
                  />
                {data.name}
                {data.id === authedUser && <Badge className='myBadge' color="info" pill>Your position</Badge>}
                </CardHeader>
                <CardBody>
                  <CardText>Answered questions: {data.answeredQuestions}</CardText>
                  <CardText>Created questions: {data.createdQuestions}</CardText>
                </CardBody>
                <CardFooter className="text-muted">Overall Score: {data.answeredQuestions + data.createdQuestions}</CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }){
  let leaderBoardDataSet = [];
  Object.keys(users).map(Id => {
    return leaderBoardDataSet.push({
      id: Id,
      avatarURL: users[Id].avatarURL,
      name: users[Id].name,
      answeredQuestions: Object.keys(users[Id].answers).length,
      createdQuestions: users[Id].questions.length,
    })
  })

  const SortedLeaderBoardDataSet = leaderBoardDataSet
    .sort((a,b) => (b.answeredQuestions + b.createdQuestions) - (a.answeredQuestions + a.createdQuestions))
  return {
    SortedLeaderBoardDataSet,
    authedUser,
  }
}
export default connect(mapStateToProps)(LeaderBoard)
