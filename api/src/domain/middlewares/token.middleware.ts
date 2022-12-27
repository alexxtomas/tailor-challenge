import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { serverResponse } from '../../utils/serverResponse.js'

export const tokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JWT_SECRET } = process.env
  if (!JWT_SECRET) throw new Error('Please set a JWT_SECRET in .env file')
  const authorization = req.get('authorization')

  let token = null
  if (authorization?.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  if (!token) {
    return serverResponse(res, {
      error: true,
      message: 'invalid format',
      status: 'FORBIDDEN'
    })
  }

  const decodedToken = jwt.verify(token, JWT_SECRET)
  if (!token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  req.user = decodedToken
  next()
}
