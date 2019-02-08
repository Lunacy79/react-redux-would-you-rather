export function formatQuestion (question, user, users, authedUser) {
    const { id, optionOne, optionTwo, timestamp, author } = question
    const { name, avatarURL } = user
    console.log(users[authedUser].answers[id])
  
    return {
      name,
      avatar: avatarURL,
      id,
      timestamp,
      optionOne: optionOne.text,
      optionTwo: optionTwo.text,
      answered: users[authedUser].answers.hasOwnProperty(id),
      answer: users[authedUser].answers.hasOwnProperty(id) ? users[authedUser].answers[id] : null,
      optionOneAnsweredBy: question.optionOne.votes.length,
      optionOneAnsweredPercentage:  question.optionOne.votes.length > 0 ? question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100 : 0,
      optionTwoAnsweredBy: question.optionTwo.votes.length,
      optionTwoAnsweredPercentage:  question.optionTwo.votes.length > 0 ? question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100 : 0
    }
  }