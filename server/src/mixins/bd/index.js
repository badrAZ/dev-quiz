import { NoQuizFound } from 'errors'

import addId from './addId'
import { JS } from './questions'

const QUIZ_BY_TYPE = {
  javascript: addId(JS),
}

export default class BD {
  api = [
    {
      name: 'bd.get',
      fn: this.get.bind(this),
    },
  ]

  get({ type }) {
    return new Promise((resolve, reject) => {
      const quiz = QUIZ_BY_TYPE[type]
      if (quiz === undefined) {
        reject(new NoQuizFound())
      } else {
        resolve(quiz)
      }
    })
  }
}
