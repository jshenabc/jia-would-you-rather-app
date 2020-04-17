import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardHeader, Input, Button } from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';

class Login extends React.Component {
  // componentDidMount () {
  //   this.props.dispatch(handleInitialData())
  // }
  state = {
    userId: null,
    toHome: false,
  }

  handleInputChange = function(e) {
  const userId = e.target.value

  this.setState(() => {
    return {
      userId,
    };
  });
}

handleLogin = function(e) {
  const { userId } = this.state
  const { dispatch } = this.props

  dispatch(setAuthedUser(userId));

  this.setState(() => {
    return {
      toHome: true,
    };
  });
}
  render() {
    const { userId, toHome } = this.state
    const { users } = this.props
    const avatar = ( userId && userId !== 'null' )? users[userId].avatarURL : 'favicon.ico';
    if(toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <Card>
        <CardHeader>Welcome to Would You Rather Game App</CardHeader>
        <CardBody>
          <CardSubtitle>Please signin</CardSubtitle>
          <img
           src={avatar}
           alt={`Avatar of ${userId}`}
           className='loginAvatar'
          />

          <Input type="select" name="select" onChange={(e) => this.handleInputChange(e)}>
            <option value='null'>Select user...</option>
            {Object.keys(users).map((key) => {
              return (
                <option value={users[key].id} key={key}>{users[key].name}</option>
              );
            })}
          </Input>
          <Button outline color="success" type='submit' className='divCenter' onClick={(e) => this.handleLogin(e)} disabled={userId === 'null'}>Login</Button>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login)
