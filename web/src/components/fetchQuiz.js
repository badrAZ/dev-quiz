import React from 'react'

import getQuiz from '../request/getQuiz'

export default function FetchQuiz(type) {
  const [quiz, setQuiz] = React.useState()
  const [error, setError] = React.useState()

  React.useEffect(() => {
    let loading = true
    get()

    async function get() {
      setQuiz(undefined)
      setError(undefined)

      try {
        const quiz = await getQuiz(type)
        if (!loading) return

        setQuiz(quiz)
        loading = false
      } catch (error) {
        setError(error.message)
      }
    }
  }, [type])

  return { error, quiz }
}
