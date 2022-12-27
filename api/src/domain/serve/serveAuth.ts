import bcrypt from 'bcrypt'
// import { serialize } from 'cookie'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { serverResponse } from '../../utils/serverResponse.js'
import userODM from '../odm/userODM.js'

const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(req.body)
  try {
    validationResult(req).throw()
    await userODM.createOne({
      username,
      password,
      favourites: []
    })
    return serverResponse(res, {
      status: 'CREATED',
      results: { username, password }
    })
  } catch (err: any) {
    serverResponse(res, {
      status: 'BAD_REQUEST',
      error: true,
      message: err.errors
    })
  }
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const { JWT_SECRET } = process.env
  if (!JWT_SECRET) throw new Error('Please set a JWT_SECRET in .env file')

  try {
    validationResult(res).throw()
    const user = await userODM.getByUsername(username)
    const isValidPasswordd = await bcrypt.compare(
      password,
      user?.password ?? ''
    )
    if (!user || !isValidPasswordd) throw new Error('invalid credentails')

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '7d'
    })
    // const serialized = serialize('myToken', 'token', {
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   maxAge: 1000 * 60 * 60 * 24 * 30
    // })

    // console.log(serialized)

    // res.setHeader('Set-Cookie', serialized)

    return serverResponse(res, {
      status: 'OK',
      message: 'Succesfully Login',
      results: token
    })
  } catch (err: any) {
    return serverResponse(res, {
      error: true,
      message: err.message,
      status: 'BAD_REQUEST'
    })
  }
}

export default { signUp, login }
