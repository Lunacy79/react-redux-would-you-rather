import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import LoadingBar from 'react-redux-loading'
import Login from './components/Login'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import QuestionPage from './components/QuestionPage'
import Leaderboard from './components/Leaderboard'
import Nav from './components/Nav'
import ErrorPage from './components/ErrorPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            
              <div>
                  <Route path='/' exact component={Login} />
                  <Route path='/home' component={Home} />
                  <Route path='/question/:id' component={QuestionPage} />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/error' component={ErrorPage} />
                </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
