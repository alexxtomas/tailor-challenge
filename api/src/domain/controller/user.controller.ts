import express from 'express'
import { tokenValidator } from '../middlewares/token.middleware.js'

import serveUser from '../serve/serveUser.js'
import {
  deleteUserValidator,
  getUserByIdValidator,
  modifyUserValidator
} from '../validators/user.validator.js'

const router = express.Router()

const baseURL = '/users'

router.get(baseURL, serveUser.getAll)
router.get(`${baseURL}/:id`, getUserByIdValidator, serveUser.getById)

router.post(
  `${baseURL}/addToFavorites`,
  tokenValidator,
  serveUser.addRestaurantToFavorites
)

router.put(
  `${baseURL}/:id`,
  modifyUserValidator,
  [tokenValidator],
  serveUser.updateById
)

router.delete(
  `${baseURL}/:id`,
  deleteUserValidator,
  tokenValidator,
  serveUser.deleteById
)

export default router
