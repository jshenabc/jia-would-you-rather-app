import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'


import VotePage from './VotePage'

class App extends Component {

  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            {this.props.loading === true
              ? null
              : <VotePage match={{params: {id: 'loxhs1bqm25b708cmbf3g'}}} />
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
