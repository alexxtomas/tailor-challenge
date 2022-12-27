import { Response as ExpressResponse } from 'express'
import { Status } from './status.js'

interface Message {
  path: (string | number)[]
  message: string
}
export type TServerResponse = (
  res: ExpressResponse,
  {
    status,
    results,
    error
  }: {
    status: keyof typeof Status
    error?: boolean
    results?: any
    message?: string | Message[]
  }
) => ExpressResponse

export const serverResponse: TServerResponse = (
  res,
  { status, error = false, results = [], message = '' }
) => {
  if (typeof results === 'undefined') results = []
  if (!results?.length || typeof results !== 'object') results = [results]
  return res.status(Status[status]).json({ results, error, message })
}
