import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, CardHeader, CardBody,
  CardTitle, CardText, CustomInput, Form, FormGroup } from 'reactstrap';

class Question extends Component {
  render() {
    const { answered } = this.props
    const { question, users } = this.props
    const {
      optionOne, optionTwo, author, timestamp, id,
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
              <CardTitle>Would you rather</CardTitle>

              <Form onSubmit={this.handleSubmit}>
               <FormGroup>
                 <CustomInput type="radio" id="optionOneRadio" name="customRadio" label={optionOne.text} />
               </FormGroup>
               <FormGroup>
                  <CustomInput type="radio" id="optionTwoRadio" name="customRadio" label={optionTwo.text} />
               </FormGroup>
               <Button color="info" type='submit'>Submit</Button>
              </Form>

          </CardBody>
        </Card>
      </div>
    )
  }
}

//use function formatTweet (tweet, author, authedUser, parentTweet)
function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params
  const question = questions[id]
  return {
    authedUser,
    question,
    users,
  }
}

export default connect(mapStateToProps)(Question)
