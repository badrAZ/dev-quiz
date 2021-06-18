import Card from 'react-bootstrap/Card'
import React from 'react'
import { BsPuzzleFill } from 'react-icons/bs'

import SelectQuizType from './selectQuizType'
import QuizForm from './quizForm'

export default function Quiz() {
  const [type = 'javascript', setType] = React.useState()

  return (
    <Card>
      <Card.Header>
        <h3 className='text-md-center'>
          <BsPuzzleFill /> Quiz
        </h3>
        <SelectQuizType onChange={setType} value={type} />
      </Card.Header>
      <Card.Body>
        <QuizForm type={type} />
      </Card.Body>
    </Card>
  )
}
