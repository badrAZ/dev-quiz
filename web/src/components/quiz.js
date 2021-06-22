import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import React from 'react'
import { BsPuzzleFill } from 'react-icons/bs'

import checkAnswers from '../request/checkAnswers'
import NoData from '../common/noData'
import randomId from '../common/randomId'

import Error from './error'
import FetchQuiz from './fetchQuiz'
import QuizForm from './quizForm'
import QuizResultModal from './quizResultModal'
import SelectQuizType from './selectQuizType'

export default function Quiz() {
  const [type, setType] = React.useState('javascript')
  const { error, quiz, reFetch } = FetchQuiz(type)
  const [quizAnswers, setQuizAnswers] = React.useState({})
  const [formId, setFormId] = React.useState(randomId())
  const [quizResult, setQuizResult] = React.useState({})
  const [showModal, setShowModal] = React.useState(false)

  const cleanForm = React.useCallback(() => {
    setQuizAnswers({})
    setFormId(randomId)
  }, [])

  const onTypeChange = React.useCallback(
    type => {
      setType(type)
      cleanForm()
    },
    [cleanForm]
  )

  const onSubmit = React.useCallback(
    event => {
      event.preventDefault()

      // correct answer can be undefined when the user doesn't respond to the question
      checkAnswers(quizAnswers, type).then(
        ({ correctAnswers, score }) => {
          const result = { score, answers: [] }
          Object.entries(quiz).forEach(([id, { question }]) => {
            result.answers.push({
              q: question,
              answer: quiz[id].answers[quizAnswers[id]],
              correct: quiz[id].answers[correctAnswers[id] ?? quizAnswers[id]],
            })
          })

          setQuizResult(result)
          setShowModal(true)
          cleanForm()
          reFetch()
        },
        error => {
          setQuizResult({
            error,
          })
          setShowModal(true)
          cleanForm()
          reFetch()
        }
      )
    },
    [quizAnswers, type, quiz, cleanForm, reFetch]
  )

  return (
    <Card>
      <Card.Header>
        <h3 className='text-md-center'>
          <BsPuzzleFill /> Quiz
        </h3>
        <SelectQuizType onChange={onTypeChange} value={type} />
      </Card.Header>
      <Card.Body>
        <QuizResultModal
          setShowModal={setShowModal}
          showModal={showModal}
          quizResult={quizResult}
        />
        {error !== undefined ? (
          <Error error={error} />
        ) : (
          <NoData data={quiz}>
            {() => (
              <Form id={formId} onSubmit={onSubmit}>
                <QuizForm
                  quiz={quiz}
                  quizAnswers={quizAnswers}
                  setQuizAnswers={setQuizAnswers}
                />
              </Form>
            )}
          </NoData>
        )}
      </Card.Body>
      <Card.Footer className='text-md-center'>
        {quiz !== undefined && (
          <Button type='submit' variant='success' form={formId}>
            Validate
          </Button>
        )}
      </Card.Footer>
    </Card>
  )
}
