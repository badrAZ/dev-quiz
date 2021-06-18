/* eslint-env jest */

import checkAnswers from './checkAnswers'

describe('checkAnswers():', () => {
  const QUESTIONS = {
    1: {
      question: 'Who invented JavaScript?',
      answers: {
        a: 'Douglas Crockford',
        b: 'Sheryl Sandberg',
        c: 'Brendan Eich',
      },
      correctAnswer: 'c',
    },
    2: {
      question: 'Which one of these is a JavaScript package manager?',
      answers: {
        a: 'Node.js',
        b: 'TypeScript',
        c: 'npm',
      },
      correctAnswer: 'c',
    },
    3: {
      question: 'Which tool can you use to ensure code quality?',
      answers: {
        a: 'Angular',
        b: 'jQuery',
        c: 'RequireJS',
        d: 'ESLint',
      },
      correctAnswer: 'd',
    },
    4: {
      question: 'Which of the following statements will throw an error?',
      answers: {
        a: 'const fun = function bar( ){ }',
        b: 'function fun( ){ }',
        c: 'function( ){ }',
      },
      correctAnswer: 'c',
    },
  }

  it('checks answers which are all wrong', () => {
    const nAskedQuestions = 3
    const answers = {
      1: 'a',
      2: 'a',
      4: 'a',
    }
    const expected = {
      correctAnswers: {
        1: 'c',
        2: 'c',
        4: 'c',
      },
      score: [0, nAskedQuestions],
    }

    expect(checkAnswers(QUESTIONS, answers, nAskedQuestions)).toStrictEqual(
      expected
    )
  })

  it('checks answers which are all right', () => {
    const nAskedQuestions = 3
    const answers = {
      1: 'c',
      2: 'c',
      4: 'c',
    }
    const expected = {
      correctAnswers: {},
      score: [3, nAskedQuestions],
    }

    expect(checkAnswers(QUESTIONS, answers, nAskedQuestions)).toStrictEqual(
      expected
    )
  })

  it('checks answers with one wrong answer', () => {
    const nAskedQuestions = 3
    const answers = {
      1: 'c',
      2: 'a',
      3: 'd',
    }
    const expected = {
      correctAnswers: {
        2: 'c',
      },
      score: [2, nAskedQuestions],
    }

    expect(checkAnswers(QUESTIONS, answers, nAskedQuestions)).toStrictEqual(
      expected
    )
  })

  it('checks answers with one missing answer', () => {
    const nAskedQuestions = 3
    const answers = {
      1: 'c',
      3: 'd',
    }
    const expected = {
      correctAnswers: {},
      score: [2, nAskedQuestions],
    }

    expect(checkAnswers(QUESTIONS, answers, nAskedQuestions)).toStrictEqual(
      expected
    )
  })
})
