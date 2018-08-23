import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionResult from './QuestionResult'
import VotePage from './VotePage'
import NavBar from './NavBar'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import NoMatch from './NoMatch'

class App extends Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loggedIn } = this.props
    //ProtectedRoute function code
    const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
        <Route
          path={path}
          {...rest}
          render={props => {
            return loggedIn ? <Comp {...props} /> : <Redirect to="/Login" />;
          }}
        />
      );
    }
    return (
      <Router>
        <Fragment>
          <div>
            <NavBar/>
            <LoadingBar />
            {this.props.loading === true
              ? null
            :  <div className='container'>
                <Switch>
                  <ProtectedRoute path='/' exact component={Dashboard} loggedIn={loggedIn}/>
                  <ProtectedRoute path='/Question/:id' exact component={VotePage} loggedIn={loggedIn}/>
                  <ProtectedRoute path='/Result/:id' exact component={QuestionResult} loggedIn={loggedIn}/>
                  <ProtectedRoute path='/New' exact component={NewQuestion} loggedIn={loggedIn}/>
                  <ProtectedRoute path='/LeaderBoard' exact component={LeaderBoard} loggedIn={loggedIn}/>
                  <Route path='/Login' exact component={Login}/>
                  <Route component={NoMatch} />
                </Switch>
              </div>


              //<VotePage match={{params: {id: 'loxhs1bqm25b708cmbf3g'}}} />
              //<QuestionResult match={{params: {id: 'loxhs1bqm25b708cmbf3g'}}} />
              //<Dashboard />
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null,
    loggedIn: authedUser !== 'null',
  }
}

export default connect(mapStateToProps)(App)
