import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, CardHeader, CardBody,
  CardTitle, CardText } from 'reactstrap';

class Question extends Component {
  render() {
    const { answered } = this.props
    const { question, users } = this.props
    const {
      optionOne, author, timestamp, id,
    } = question
    if (question === null) {
      return(
        <p>This question doesnt exist</p>
      )
    }
    //console.log(this.props)
    return (
      <div>
        <Card>
          <CardHeader>
          <img
            src={users[author].avatarURL}
            alt={`Avator of ${users[author].name}`}
            className='avatar'
          />
          {users[author].name} asks:</CardHeader>
          <CardBody>
            <div className='question-info'>
              <CardTitle>Would you rather</CardTitle>
              <CardText>...{optionOne.text}...</CardText>
              {answered
                ? <Link to={`/question/${id}`}><Button outline color="info">View Poll Result</Button></Link>
                : <Link to={`/question/${id}`}><Button outline color="info">View Poll</Button></Link>
              }
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }
}

//use function formatTweet (tweet, author, authedUser, parentTweet)
function mapStateToProps ({authedUser, users, questions}, {id}) {
  const question = questions[id]
  return {
    authedUser,
    question,
    users,
  }
}

export default connect(mapStateToProps)(Question)
