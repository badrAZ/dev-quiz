import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'react-proptypes'
import React from 'react'
import { MdQuestionAnswer } from 'react-icons/md'
import {
  AiFillTrophy,
  AiFillCrown,
  AiFillCloseCircle,
  AiFillCheckCircle,
} from 'react-icons/ai'

import Error from './error'

function Score({ score }) {
  const [color, level] = React.useMemo(() => {
    const mod = score[0] / score[1]
    return mod > 0.5
      ? ['green', 'success']
      : mod > 0.4
      ? ['yellow', 'warning']
      : ['red', 'danger']
  }, [score])
  return (
    <div
      className={`center-middle-block text-${level}`}
      style={{
        fontSize: 35,
        border: `0.05em solid ${color}`,
        borderRadius: '50%',
        width: '3.5em',
        height: '3.5em',
      }}
    >
      <AiFillTrophy /> {score[0]}/{score[1]}
    </div>
  )
}

function Answers({ answers }) {
  return (
    <ListGroup>
      {answers.map(
        ({ q, answer, correct }) =>
          (answer === undefined || answer !== correct) && (
            <ListGroup.Item key={q}>
              <p>
                <MdQuestionAnswer /> {q}
              </p>
              <p className='text-danger'>
                <AiFillCloseCircle /> {answer ?? 'Not filled'}
              </p>
              {correct !== undefined && (
                <p className='text-success'>
                  <AiFillCheckCircle /> {correct}
                </p>
              )}
            </ListGroup.Item>
          )
      )}
    </ListGroup>
  )
}

export default function QuizResultModal({
  quizResult: { score, answers, error },
  setShowModal,
  showModal,
}) {
  const handleClose = React.useCallback(
    () => setShowModal(false),
    [setShowModal]
  )

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <AiFillCrown /> Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error !== undefined ? (
          <Error error={error} />
        ) : (
          <div>
            <div className='center-middle-block'>
              <Score score={score} />
            </div>
            <div className='mt-2'>
              <Answers answers={answers} />
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

QuizResultModal.propTypes = {
  quizResult: PropTypes.object.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}
