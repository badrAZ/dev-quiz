export default function checkAnswers(questions, answers, nAskedQuestions) {
  const correctAnswers = {}
  let score = 0
  Object.entries(answers).forEach(([id, answer]) => {
    const { correctAnswer } = questions[id]
    if (correctAnswer === answer) {
      ++score
    } else {
      correctAnswers[id] = correctAnswer
    }
  })
  return {
    correctAnswers,
    score: [score, nAskedQuestions],
  }
}
