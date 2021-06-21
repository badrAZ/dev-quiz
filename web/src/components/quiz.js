import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import React from 'react'
import { BsPuzzleFill } from 'react-icons/bs'
import { RiAlarmWarningFill } from 'react-icons/ri'

import NoData from '../common/noData'
import randomId from '../common/randomId'

import FetchQuiz from './fetchQuiz'
import QuizForm from './quizForm'
import SelectQuizType from './selectQuizType'

export default function Quiz() {
  const [type, setType] = React.useState('javascript')
  const { error, quiz } = FetchQuiz(type)
  const [quizAnswers, setQuizAnswers] = React.useState({})
  const [formId, setFormId] = React.useState(randomId())

  const onTypeChange = React.useCallback(type => {
    setType(type)
    setQuizAnswers({})
    setFormId(randomId)
  }, [])

  const validate = React.useCallback(event => {
    event.preventDefault()
    console.log('To implement')
  }, [])

  return (
    <Card>
      <Card.Header>
        <h3 className='text-md-center'>
          <BsPuzzleFill /> Quiz
        </h3>
        <SelectQuizType onChange={onTypeChange} value={type} />
      </Card.Header>
      <Card.Body>
        {error !== undefined ? (
          <div className='text-danger'>
            <RiAlarmWarningFill /> {error}
          </div>
        ) : (
          <NoData data={quiz}>
            {() => (
              <Form id={formId} onSubmit={validate}>
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
