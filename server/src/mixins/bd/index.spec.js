/* eslint-env jest */

import BD from '.'
import { JS } from './questions'

describe('get():', () => {
  let bd

  beforeAll(() => {
    bd = new BD()
  })

  afterAll(() => {
    bd = undefined
  })

  it('get a quiz by type', async () => {
    const quiz = await bd.get({ type: 'javascript' })
    expect(Object.values(quiz)).toStrictEqual(JS)
    Object.keys(quiz).forEach(id => expect(typeof id).toBe('string'))
  })
})
