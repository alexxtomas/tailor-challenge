import { body, param } from 'express-validator'
import restaurantODM from '../odm/restaurantODM.js'

export const createRestaurantValidator = [
  body('name')
    .exists()
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      console.log('VALUE', value)
      const restaurant = await restaurantODM.getByName(value)
      if (restaurant) throw new Error('restaurant name no available')
      return true
    }),
  body('neighborhood').exists().isString().notEmpty(),
  body('address')
    .exists()
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await restaurantODM.getByAdress(value)
      if (restaurant) throw new Error('restaurant address not available')
      return true
    }),
  body('latlng')
    .isObject()
    .notEmpty()
    .custom((value, { req }) => {
      const keys = Object.keys(value)
      const correctKeys = keys.filter(
        (key) =>
          (key === 'lat' && typeof value[key] === 'number') ||
          (key === 'lng' && typeof value[key] === 'number')
      )
      if (keys.length !== 2 || correctKeys.length !== 2) {
        throw new Error('latlng must have the lat and lng keys')
      }

      return true
    }),
  body('cuisine_type').exists().isString().notEmpty(),
  body('operating_hours')
    .exists()
    .isObject()
    .notEmpty()
    .custom((value, { req }) => {
      const keys = Object.keys(value)
      const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
      const incorrectKeys = keys.filter(
        (key) => !days.includes(key) || typeof value[key] !== 'string'
      )
      if (incorrectKeys.length !== 0)
        throw new Error(
          `operating_hours must be an object with this keys ${days.map(
            (day) => ` ${day}`
          )} and and its values must be of type string and its format mus be hh:mm am|pm - hh:mm am|pm`
        )

      return true
    })
]

export const modifyRestaurantValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await restaurantODM.getById(value)
      if (!restaurant) {
        console.log('a')
        throw new Error('No restaurant with this id')
      }
      return true
    }),
  body('name')
    .exists()
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await restaurantODM.getByName(value)
      if (restaurant) throw new Error('restaurant name no available')
      return true
    }),
  body('neighborhood').exists().isString().notEmpty(),
  body('address')
    .exists()
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await restaurantODM.getByAdress(value)
      if (restaurant) throw new Error('restaurant address not available')
      return true
    }),
  body('latlng')
    .exists()
    .isObject()
    .notEmpty()
    .custom((value, { req }) => {
      const keys = Object.keys(value)
      const correctKeys = keys.filter(
        (key) =>
          (key === 'lat' && typeof value[key] === 'number') ||
          (key === 'lng' && typeof value[key] === 'number')
      )
      if (keys.length !== 2 || correctKeys.length !== 2) {
        throw new Error('latlng must have the lat and lng keys')
      }

      return true
    }),

  body('cuisine_type').exists().isString().notEmpty(),
  body('operating_hours')
    .exists()
    .isObject()
    .notEmpty()
    .custom((value, { req }) => {
      const keys = Object.keys(value)
      const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
      const incorrectKeys = keys.filter(
        (key) => !days.includes(key) || typeof value[key] !== 'string'
      )
      if (incorrectKeys.length !== 0)
        throw new Error(
          `operating_hours must be an object with this keys ${days.map(
            (day) => ` ${day}`
          )} and and its values must be of type string and its format mus be hh:mm am|pm - hh:mm am|pm`
        )

      return true
    }),
  body('reviews')
    .exists()
    .isArray()
    .notEmpty()
    .custom((value, { req }) => {
      if (!value?.length || typeof value !== 'object') {
        throw new Error('reviews must be an array')
      }
      const invalidValues = value.filter(
        ({
          name,
          date,
          comments,
          rating
        }: {
          name: string
          date: string
          comments: string
          rating: number
        }) =>
          typeof name !== 'string' ||
          typeof date !== 'string' ||
          typeof rating !== 'number' ||
          typeof comments !== 'string'
      )
      if (invalidValues.length !== 0)
        throw new Error('Invalid format in reviews field')

      return true
    })
]

export const getRestaurantByIdValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await restaurantODM.getById(value)
      if (!restaurant) {
        console.log('a')
        throw new Error('No restaurant with this id')
      }
      return true
    })
]

export const deleteRestaurantValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await restaurantODM.getById(value)
      if (!restaurant) throw new Error('No restaurant with this id')
      return true
    })
]
