const getRandomId = () => Math.random().toString(16).slice(2)

const addId = data => {
  const result = {}
  data.forEach(q => {
    result[getRandomId()] = q
  })
  return result
}

export { addId as default }
