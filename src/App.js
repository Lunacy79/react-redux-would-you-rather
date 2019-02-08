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
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: rest.location.pathname }}
          />
        )
      }
    />
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    let { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            
              <div>
                <Switch>
                  <Route path='/' exact component={Login} />
                  <PrivateRoute path='/home' component={Home} authedUser={authedUser} />
                  <PrivateRoute path='/question/:id' component={QuestionPage} authedUser={authedUser} />
                  <PrivateRoute path='/add' component={NewQuestion} authedUser={authedUser} />
                  <PrivateRoute path='/leaderboard' component={Leaderboard} authedUser={authedUser} />
                  <PrivateRoute path='/error' component={ErrorPage} authedUser={authedUser} />
                </Switch>
                </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
