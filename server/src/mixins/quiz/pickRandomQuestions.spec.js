/* eslint-env jest */

import generateString from '../generateString'

import pickRandomQuestions from './pickRandomQuestions'

const generateNQuestions = n => {
  const questions = {}
  for (let i = 0; i < n; ++i) {
    questions[generateString()] = {
      question: generateString(),
      answers: {
        a: generateString(),
      },
      correctAnswer: 'a',
    }
  }
  return questions
}

const N_QUESTIONS = 10
const N_RANDOM_QUESTIONS = 5

describe('pickRandomQuestions', () => {
  let randomQuestion, questions

  beforeAll(() => {
    questions = generateNQuestions(N_QUESTIONS)
    randomQuestion = pickRandomQuestions(questions, N_RANDOM_QUESTIONS)
  })

  it(`should returns ${N_RANDOM_QUESTIONS} questions`, () =>
    expect(Object.keys(randomQuestion).length).toBe(N_RANDOM_QUESTIONS))

  test('returned questions should be in the passed questions', () => {
    expect(Object.keys(questions)).toEqual(
      expect.arrayContaining(Object.keys(randomQuestion))
    )
    expect(Object.values(questions)).toEqual(
      expect.arrayContaining(Object.values(randomQuestion))
    )
  })

  test('returned questions should be random', () => {
    expect(randomQuestion).not.toEqual(
      pickRandomQuestions(questions, N_RANDOM_QUESTIONS)
    )
  })
})
