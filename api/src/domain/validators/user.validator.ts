import { body, param } from 'express-validator'
import userODM from '../odm/userODM.js'
export const signUpValidator = [
  body('username')
    .isString()
    .isLength({ min: 2 })
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await userODM.getByUsername(value)
      if (user) throw new Error('this username is not available')
      return true
    }),
  body('password').isString().isLength({ min: 6 }).notEmpty()
]

export const modifyUserValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await userODM.getById(value)
      if (!user) throw new Error('No user with this id')
      return true
    }),
  body('username')
    .isString()
    .isLength({ min: 2 })
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await userODM.getByUsername(value)
      if (user) throw new Error('this username is not available')
      return true
    }),
  body('password').isString().isLength({ min: 6 }).notEmpty()
]

export const getUserByIdValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await userODM.getById(value)
      if (!user) throw new Error('No user with this id')
      return true
    })
]

export const deleteUserValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await userODM.getById(value)
      if (!user) throw new Error('No user with this id')
      return true
    })
]
