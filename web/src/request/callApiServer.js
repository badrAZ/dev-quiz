const END_POINT = '/api'

export default function callApiServer(method, params) {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')

  return fetch(END_POINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      method,
      params,
    }),
  }).then(async res => {
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }

    return res.text()
  })
}
