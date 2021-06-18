import call from './callApiServer'

export default function getQuiz(type) {
  return call('quiz.getQuestions', { type }).then(JSON.parse)
}
