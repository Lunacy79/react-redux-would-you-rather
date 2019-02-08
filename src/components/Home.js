import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from "react-router-dom";

class Home extends Component {
  state = {
    showQuestions: 'unanswered',
  }

  render() {

    const showQuestions = (value) => {
      let showQuestions = value
      this.setState(() => ({
        showQuestions: showQuestions,
    }))
    }

    const getClassname1 = () => {
      if (this.state.showQuestions === 'unanswered'){
        return ('clicked')
      }
      else {
        return ('unclicked')
      }
    }

    const getClassname2 = () => {
      if (this.state.showQuestions === 'answered'){
        return ('clicked')
      }
      else {
        return ('unclicked')
      }
    }

    // const { showQuestions } = this.state
    console.log(this.props.unansweredQuestions)
    console.log(this.props.authedUser)
    console.log(_.difference(this.props.questionsIds, this.props.answeredQuestions))

    if (this.props.authedUser === null){
      return (<Redirect to="/" />)
    }
    return (
      <div className='home'>
        <h3>Home</h3>
        <div className='toggles'>
          <div className={getClassname1()} onClick={() => showQuestions('unanswered')}>
            Show unanswered questions
          </div>
          <div className={getClassname2()} onClick={() => showQuestions('answered')}>
            Show answered questions
          </div>
        </div>
        <h3>Questions</h3>
        <ul className='questionlist'>
          {this.state.showQuestions === 'unanswered' 
            ? this.props.unansweredQuestions.map((id) => (
              <li key={id}>
                <Link to={`/question/${id}`} className='question-options'>
                      <div className='option'>
                        <p>{this.props.questions[id].optionOne.text}</p>
                      </div>
                      <div className='option'>
                        <p>{this.props.questions[id].optionTwo.text}</p>
                      </div>
                  </Link>
              </li>
            ))
            : this.props.answeredQuestions.map((id) => (
              <li key={id}>
                <Link to={`/question/${id}`} className='question-options'>
                      <div className='option'>
                        <p>{this.props.questions[id].optionOne.text}</p>
                      </div>
                      <div className='option'>
                        <p>{this.props.questions[id].optionTwo.text}</p>
                      </div>
                  </Link>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  if(authedUser !== null){
    return {
      questions,
      authedUser,
      answeredQuestions: Object.keys(users[authedUser].answers),
      unansweredQuestions: _.difference(Object.keys(questions), Object.keys(users[authedUser].answers)),
      questionsIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
  }
  else {
    return {authedUser,}
  }
  
}

export default connect(mapStateToProps)(Home)