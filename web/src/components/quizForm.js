import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import PropTypes from 'react-proptypes'
import React from 'react'
import Row from 'react-bootstrap/Row'
import { RiAlarmWarningFill } from 'react-icons/ri'

import NoData from '../common/noData'

import FetchQuiz from './fetchQuiz'

export default function QuizForm({ type }) {
  const { error, quiz } = FetchQuiz(type)
  const [pos, setPos] = React.useState(0)

  const next = React.useCallback(() => {
    if (pos < Object.keys(quiz).length - 1) {
      setPos(pos + 1)
    }
  }, [pos, quiz])
  const back = React.useCallback(() => {
    if (pos > 0) {
      setPos(pos - 1)
    }
  }, [pos])

  return error !== undefined ? (
    <div className='text-danger'>
      <RiAlarmWarningFill /> {error}
    </div>
  ) : (
    <NoData data={quiz}>
      {() => (
        <Container fluid>
          <Row>
            <Col>{JSON.stringify(Object.values(quiz)[pos])}</Col>
          </Row>
          <Row>
            <Col md={{ span: 6 }}>
              <Button size='sm' disabled={pos === 0} onClick={back}>
                Back
              </Button>
            </Col>
            <Col md={{ offset: 4 }}>
              <Button
                disabled={pos === Object.keys(quiz).length - 1}
                onClick={next}
                size='sm'
              >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </NoData>
  )
}

QuizForm.propTypes = {
  type: PropTypes.string.isRequired,
}
