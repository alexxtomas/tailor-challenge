import express from 'express'

import serveAuth from '../serve/serveAuth.js'
import { signUpValidator } from '../validators/user.validator.js'

const router = express.Router()

const baseURL = '/auth'

router.post(`${baseURL}/signUp`, signUpValidator, serveAuth.signUp)

router.post(`${baseURL}/login`, serveAuth.login)

export default router
