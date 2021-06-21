import call from './callApiServer'

export default function checkAnswers(answers, type) {
    return call('quiz.checkAnswers', { answers, type }).then(JSON.parse)
}
