import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'

class Question extends Component {
  
  
    render()  {
        const { question } = this.props

        if(question === null) {
            return <p>This Question doesn't exist.</p>
        }

        const {
            name, avatar, optionOne, optionTwo, answered, answer, optionOneAnsweredBy, optionOneAnsweredPercentage, optionTwoAnsweredBy, optionTwoAnsweredPercentage
        } = question


        const getInfoOptionOne = () => {
            if(answered){
                console.log('true')
                return (
                    <div className='info'>
                        <p>{`Votes: ${optionOneAnsweredBy}`}</p>
                        <p>{`Percentage: ${optionOneAnsweredPercentage}`}</p>
                    </div>
                )
            }
        }

        const getInfoOptionTwo = () => {
            if(answered){
                return (
                    <div className='info'>
                        <p>{`Votes: ${optionTwoAnsweredBy}`}</p>
                        <p>{`Percentage: ${optionTwoAnsweredPercentage}`}</p>
                    </div>
                )
            }
        }

        const getClassName1 = () => {
            console.log(question)
            if(answer === 'optionOne'){
                return 'option answered'
            } else if (answer === 'optionTwo') {
                return 'option notanswered'
            } else {
                return 'option'
            }
        }

        const getClassName2 = () => {
            if(answer === 'optionTwo'){
                return 'option answered'
            }  else if (answer === 'optionOne') {
                return 'option notanswered'
            } else {
                return 'option'
            }
        }

        const choose = (option) => {
            const { dispatch, question } = this.props

            dispatch(handleSaveAnswer({
                id: question.id,
                answer: option
            }))
        }


        console.log(this.props)
        return (
            <div>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className = 'avatarpic'
                />
                <div className='wyr'>
                        <h3>Would you rather...</h3>
                </div>
                <div className='question-options'>
                    <div className='option-container'>
                    <div className={getClassName1()}>
                        <div onClick={() => {!answered && choose('optionOne')}}>
                            <p>{optionOne}</p>
                        </div>
                        
                    </div>
                    {getInfoOptionOne()}
                    </div>
                    <div className='option-container'>
                    <div className={getClassName2()}>
                        <div onClick={() => {!answered && choose('optionTwo')}}>
                            <p>{optionTwo}</p>
                        </div>
                        
                    </div>
                    {getInfoOptionTwo()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({questions, users, authedUser}, { id }) {
    const question = questions[id]

    return {
        authedUser,
        question: question 
            ? formatQuestion(question, users[question.author], users, authedUser)
            : null
    }
}

export default connect(mapStateToProps)(Question)