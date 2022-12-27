import { Express } from 'express'
import apiServices from '../domain/controller/index.js'
export const routes = (prefix: string, server: Express) => {
  server.use(prefix, apiServices)
}
