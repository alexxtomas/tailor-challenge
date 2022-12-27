import express from 'express'

import { tokenValidator } from '../middlewares/token.middleware.js'
import { upload } from '../middlewares/upload..middleware.js'
import serveRestaurant from '../serve/serveRestaurant.js'
import {
  createRestaurantValidator,
  deleteRestaurantValidator,
  getRestaurantByIdValidator,
  modifyRestaurantValidator
} from '../validators/restaurant.validator.js'
const router = express.Router()

const baseURL = '/restaurants'
router.get(baseURL, serveRestaurant.getAll)
router.get(
  `${baseURL}/:id`,
  getRestaurantByIdValidator,
  serveRestaurant.getById
)

router.post(
  baseURL,
  [tokenValidator, upload.single('image')],
  createRestaurantValidator,
  serveRestaurant.createOne
)

router.put(
  `${baseURL}/:id`,
  [tokenValidator, upload.single('image')],
  modifyRestaurantValidator,
  serveRestaurant.updateById
)

router.delete(
  `${baseURL}/:id`,
  deleteRestaurantValidator,
  [tokenValidator],
  serveRestaurant.deleteById
)

export default router
