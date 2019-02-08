import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Leaderboard extends Component {
  

  render() {
    console.log(this.props.users)
    const hierachy = (users) => {
      console.log(users)
      let userlist = Object.values(users).sort((a, b) => {
        let A = Object.keys(a.answers).length + a.questions.length
        let B = Object.keys(b.answers).length + b.questions.length
        return (B - A)
      })
      return userlist
    }
    return (
      <div>
        <h3 className='leaderboard'>Leaderboard</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Avatar</th>
              <th>Asked Questions</th>
              <th>Answered Questions</th>
            </tr>
          </thead>
          <tbody>
            {hierachy(this.props.users).map((user) => (
              <tr key={user.id}>
                <td>
                  <div className='name'>
                      {user.name}
                  </div>
                </td>
                <td>
                  <img className="avatar" src={user.avatarURL} />
                </td>
                <td>
                  <div className='askedQuestions'>
                      {user.questions.length}
                  </div>
                </td>
                <td>
                  <div className='answeredQuestions'>
                      {Object.keys(user.answers).length}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  console.log(users)
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)