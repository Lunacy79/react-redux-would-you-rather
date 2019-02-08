import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>An Error occured!</h3>
        <p>
          The page you requested was not found.
        </p>
      </div>
    )
  }
}



export default ErrorPage