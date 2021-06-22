import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'react-proptypes'
import React from 'react'
import { AiFillTrophy, AiFillCrown } from 'react-icons/ai'

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
