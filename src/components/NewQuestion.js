import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }

    handleChange1 = (e) => {
        const optionOne = e.target.value

        this.setState(() => ({
            optionOne
        }))
    }
    handleChange2 = (e) => {
        const optionTwo = e.target.value

        this.setState(() => ({
            optionTwo
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state

        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        console.log('New Question: ', optionOne, optionTwo)

        this.setState(() => ({
            text: '',
            toHome: true,
        }))
    }
    
    render() {
        const { optionOne, optionTwo, toHome } = this.state
        
        if (this.props.authedUser === null){
            return (<Redirect to="/" />)
        }

        if(toHome === true) {
            return <Redirect to='/home' />
        }
        
        return (
            <div className='newquestion'>
                <h3>Compose new Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="Option One"
                        value={optionOne}
                        onChange={this.handleChange1}
                        className='textarea'
                        maxLength={288}
                    />
                    <textarea
                        placeholder="Option Two"
                        value={optionTwo}
                        onChange={this.handleChange2}
                        className='textarea'
                        maxLength={288}
                    />
                    <button
                        className='button'
                        type='submit'
                        disabled={optionTwo === '' || optionOne === ''}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion)