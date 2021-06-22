import React, { useCallback, useState } from 'react'

import getQuiz from '../request/getQuiz'
import randomId from '../common/randomId'

export default function FetchQuiz(type) {
  const [quiz, setQuiz] = React.useState()
  const [error, setError] = React.useState()
  const [randomString, setRandomString] = useState(randomId)

  const reFetch = useCallback(() => {
    setRandomString(randomId)
  }, [])

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
  }, [type, randomString])

  return { error, reFetch, quiz }
}
