import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import PropTypes from 'react-proptypes'
import React from 'react'
import Row from 'react-bootstrap/Row'
import { MdQuestionAnswer } from 'react-icons/md'

function SubForm({ id, question, answers }) {
  return [
    <Row className='mb-1' key='question'>
      <Col>
        <MdQuestionAnswer size={20} /> {question}
      </Col>
    </Row>,
    ...Object.entries(answers).map(([value, answer]) => (
      <Row key={value}>
        <Col>
          <Form.Check label={answer} type='radio' id={value} />
        </Col>
      </Row>
    )),
  ]
}

function QuizPagination({ pos, setPos, nQuestions }) {
  const next = React.useCallback(() => {
    if (pos < nQuestions - 1) {
      setPos(pos + 1)
    }
  }, [pos, nQuestions, setPos])
  const back = React.useCallback(() => {
    if (pos > 0) {
      setPos(pos - 1)
    }
  }, [pos, setPos])

  return (
    <Row>
      <Col>
        <Button size='sm' disabled={pos === 0} onClick={back}>
          Back
        </Button>
        <Button
          className='float-md-right'
          disabled={pos === nQuestions - 1}
          onClick={next}
          size='sm'
        >
          Next
        </Button>
      </Col>
    </Row>
  )
}

export default function QuizForm({ quiz, quizAnswers, setQuizAnswers }) {
  const [pos, setPos] = React.useState(0)
  const nQuestions = Object.keys(quiz).length

  const currentQuiz = React.useMemo(() => {
    const [id, currentQuiz] = Object.entries(quiz)[pos]
    return {
      id,
      ...currentQuiz,
    }
  }, [quiz, pos])

  return (
    <Container fluid>
      <Row>
        <Col>
          <Badge className='float-md-right' variant='primary'>
            {pos + 1}/{nQuestions}
          </Badge>
        </Col>
      </Row>
      <SubForm {...currentQuiz} />
      <QuizPagination pos={pos} setPos={setPos} nQuestions={nQuestions} />
    </Container>
  )
}

QuizForm.propTypes = {
  quiz: PropTypes.object.isRequired,
  quizAnswers: PropTypes.object.isRequired,
  setQuizAnswers: PropTypes.func.isRequired,
}
