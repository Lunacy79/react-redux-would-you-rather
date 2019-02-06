import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  
  
    render() {
        return (
          <div>
            <h3 className='center'>Question</h3>
            <ul className='questionlist'>
              {this.props.questionsIds.map((id) => (
                <li key={id}>
                <Question id={id} />
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

export default connect(mapStateToProps)(QuestionPage)