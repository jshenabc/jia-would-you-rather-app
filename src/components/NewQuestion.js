import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { Card, Button, CardHeader, CardBody,
  CardTitle, CardText, Form, FormGroup, Label, Input  } from 'reactstrap';

class NewQuestion extends Component {
  //when you type the submit button will change so we need to use this.state.
  state= {
    OptOnetext: '',
    OptTwotext: '',
    toHome: false,
  }

  handleOptOneChange = (e) => {
    const OptOnetext = e.target.value
    this.setState(() => ({
      OptOnetext
    }))
  }

  handleOptTwoChange = (e) => {
    const OptTwotext = e.target.value
    this.setState(() => ({
      OptTwotext
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { OptOnetext, OptTwotext } = this.state
    const { dispatch } = this.props
    console.log('new question',OptOnetext)
    //todo: add question to stroe
    dispatch(handleAddQuestion(OptOnetext, OptTwotext))
    this.setState(() => ({
      OptOnetext: '',
      OptTwotext: '',
      toHome: true,
    }))
  }
  render() {
    const { OptOnetext, OptTwotext, toHome } = this.state
    if (toHome === true ) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        <Card>
          <CardHeader className='newQuestionHeader'>Create New Question</CardHeader>
            <CardBody>
               <CardText>Complete the question</CardText>
               <CardTitle>Would you rather...</CardTitle>
               <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="optionOneInputLabel">Option One</Label>
                  <Input type="optionOne" name="optionOne" id="optionOneInput" placeholder="Enter Option One Text Here" onChange={this.handleOptOneChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="optionTwoInputLabel">Option Two</Label>
                  <Input type="optionTwo" name="optionTwo" id="optionTwoInput" placeholder="Enter Option Two Text Here" onChange={this.handleOptTwoChange}/>
                </FormGroup>
                <Button color="info" type='submit'  disabled={OptOnetext === '' || OptTwotext === ''}>Submit</Button>
               </Form>
            </CardBody>
         </Card>
      </div>
    )
  }
}


export default connect()(NewQuestion)
