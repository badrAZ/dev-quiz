import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'react-proptypes'
import React from 'react'

export default function QuizResultModal({ quizResult, setShow }) {
  const handleClose = React.useCallback(() => setShow(false), [setShow])

  return <Modal show={quizResult.show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Result</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}

QuizResultModal.propTypes = {
  quizResult: PropTypes.object.isRequired,
  setShow: PropTypes.func.isRequired,
}