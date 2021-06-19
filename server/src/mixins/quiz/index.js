import checkAnswers from './checkAnswers'
import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'
import pickRandomQuestion from './pickRandomQuestions'

export default class Quiz {
  #app

  api = [
    {
      name: 'quiz.getQuestions',
      fn: this.getQuestions.bind(this),
    },
    {
      name: 'quiz.checkAnswers',
      fn: this.checkAnswers.bind(this),
    },
  ]

  constructor(app) {
    this.#app = app
  }

  async getQuestions({ type }) {
    const app = this.#app

    const questions = pickRandomQuestion(
      await app.callApiMethod('bd.get', { type }),
      app.config.nAskedQuestions
    )

    return mapValues(questions, _ => omit(_, 'correctAnswer'))
  }

  async checkAnswers({ answers }) {
    const app = this.#app

    return checkAnswers(
      await app.callApiMethod('bd.get'),
      answers,
      app.config.nAskedQuestions
    )
  }
}
