export class NotImplemented extends Error {
  constructor() {
    super('Not implemented!')
    this.code = 1000
  }
}

export class NoQuizFound extends Error {
  constructor() {
    super('No quiz found!')
    this.code = 1001
  }
}
