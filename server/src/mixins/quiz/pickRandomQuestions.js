import pick from 'lodash/pick'
import shuffle from 'lodash/shuffle'

export default function pickRandomQuestions(questions, number) {
  const ids = shuffle(Object.keys(questions)).slice(0, number)
  return pick(questions, ids)
}
