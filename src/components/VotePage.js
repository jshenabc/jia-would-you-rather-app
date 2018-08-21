import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'
import { Card, Button, CardHeader, CardBody,
  CardTitle, CardText, CustomInput, Form, FormGroup } from 'reactstrap';

class VotePage extends Component {
  state= {
    selectedAnswer: '',
    toResult: false,
  }

  handleToggle = (e) => {
    const selectedValue = e.target.value
    this.setState(() => ({
      selectedAnswer: selectedValue,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { selectedAnswer } = this.state
    const { id } = this.props.question
    const { dispatch, authedUser } = this.props
    //todo: add question to stroe
    dispatch(handleAnswerQuestion( authedUser, id, selectedAnswer ))
    this.setState(() => ({
      selectedAnswer: '',
      toResult: true,
    }))
  }

  render() {
    const { toResult } = this.state
    const { question, users, answered } = this.props
    const {
      optionOne, optionTwo, author, timestamp, id,
    } = question
    if (question === null) {
      return(
        <p>This question doesnt exist</p>
      )
    }
    if (toResult === true ) {
      return <Redirect to={`/Result/${id}`}/>
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
                 <CustomInput type="radio" id="optionOneRadio" name="customRadio" value="optionOne" onChange={this.handleToggle} label={optionOne.text} />
               </FormGroup>
               <FormGroup>
                  <CustomInput type="radio" id="optionTwoRadio" name="customRadio" value="optionTwo" onChange={this.handleToggle} label={optionTwo.text} />
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

export default connect(mapStateToProps)(VotePage)
