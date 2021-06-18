import assert from 'assert'
import express from 'express'
import config from 'config'
import { NotImplemented } from 'errors'

import mixins from './mixins'

export let app
const exposeAppOnTest = _app => {
  if (process.env === 'test') {
    app = _app
  }
}

export default class App {
  config = config
  #expressApp
  #apiMethods = {}

  // TODO: use bunyan
  log = {
    console: console.log.bind(console),
    info: console.info.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
  }

  async setUpHttpServer() {
    return new Promise((resolve, reject) => {
      const expressApp = (this.#expressApp = express())

      expressApp.use(express.json())

      expressApp.listen(config.port, () => {
        this.log.info(`Listening on port ${config.port}`)
        resolve()
      })

      expressApp.on('error', reject)
    })
  }

  async addApiMethods(methods) {
    const apiMethods = this.#apiMethods

    methods.forEach(({ name, fn }) => {
      assert(apiMethods[name] === undefined)

      apiMethods[name] = fn
    })
  }

  async callApiMethod(method, params) {
    const fn = this.#apiMethods[method]
    if (fn === undefined) {
      throw new NotImplemented()
    }

    return fn(params)
  }

  async setUpApi() {
    Object.values(mixins).forEach(C => this.addApiMethods(new C(this).api))

    const expressApp = this.#expressApp

    expressApp.post(config.apiPath, async (req, res, next) => {
      const { method, params } = req.body

      try {
        res.send(await this.callApiMethod(method, params))
      } catch (error) {
        next(error)
      }
    })

    expressApp.all((error, req, res) => {
      this.log.error(error)

      res.sendStatus(error.status ?? 500)
    })

    exposeAppOnTest(this)
  }

  async run() {
    await this.setUpHttpServer()
    await this.setUpApi()
  }
}
