import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionResult from './QuestionResult'
import VotePage from './VotePage'
import NavBar from './NavBar'
import LeaderBoard from './LeaderBoard'
import Login from './Login'

class App extends Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <NavBar/>
            <LoadingBar />
            {this.props.loading === true
              ? null
            :  <div className='container'>
                <Route path='/Dashboard' exact component={Dashboard}/>
                <Route path='/Question/:id' exact component={VotePage}/>
                <Route path='/Result/:id' exact component={QuestionResult}/>
                <Route path='/New' exact component={NewQuestion}/>
                <Route path='/LeaderBoard' exact component={LeaderBoard}/>
                <Route path='/Login' exact component={Login}/>
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
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
