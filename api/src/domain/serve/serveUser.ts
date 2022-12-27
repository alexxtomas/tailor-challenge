import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { serverResponse } from '../../utils/serverResponse.js'
import restaurantODM from '../odm/restaurantODM.js'
import userODM from '../odm/userODM.js'

const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userODM.getAll()
    return serverResponse(res, {
      results: users,
      status: 'OK'
    })
  } catch (e) {
    console.error(e)
  }
}

const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    validationResult(res).throw()
    const user = await userODM.getById(id)

    return serverResponse(res, { results: user, status: 'OK' })
  } catch (e: any) {
    return serverResponse(res, {
      error: true,
      status: 'BAD_REQUEST',
      message: e.errors
    })
  }
}

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.body

  try {
    validationResult(res).throw()
    const updatedUser = await userODM.updateById(id, user)

    return serverResponse(res, { results: updatedUser, status: 'ACCEPTED' })
  } catch (e: any) {
    return serverResponse(res, {
      error: true,
      status: 'BAD_REQUEST',
      message: e.errors
    })
  }
}

const addRestaurantToFavorites = async (req: Request, res: Response) => {
  const { id: restaurantId } = req.body
  const {
    user: { id }
  } = req

  try {
    const restaurant = await restaurantODM.getById(restaurantId)
    if (!restaurant) {
      return serverResponse(res, {
        error: true,
        message: 'The id does not belong to any restaurant',
        status: 'BAD_REQUEST'
      })
    }
    const user = await userODM.getById(id)
    if (!user) {
      return serverResponse(res, {
        error: true,
        message: 'Something went wrong, please try again',
        status: 'NOT_ACEPTABLE'
      })
    }
    user.favourites = [...user.favourites, restaurant.id]
    await user.save()

    return serverResponse(res, { status: 'OK', results: user })
  } catch (e) {
    console.error(e)
  }
}

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    validationResult(res).throw()
    const deletedUser = await userODM.deleteById(id)

    return serverResponse(res, { results: deletedUser, status: 'ACCEPTED' })
  } catch (e: any) {
    return serverResponse(res, {
      error: true,
      message: e.errors,
      status: 'BAD_REQUEST'
    })
  }
}

export default {
  getAll,
  getById,
  updateById,
  addRestaurantToFavorites,
  deleteById
}
