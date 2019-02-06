import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Home</h3>
        <ul className='questionlist'>
          {this.props.questionsIds.map((id) => (
            <li key={id}>
              <div className='question-options'>
                    <div className='option'>
                      <p>{this.props.questions[id].optionOne.text}</p>
                    </div>
                    <div className='option'>
                      <p>{this.props.questions[id].optionTwo.text}</p>
                    </div>
                </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questions,
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home)