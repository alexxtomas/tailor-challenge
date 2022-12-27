import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import cloudinary from '../../services/cloudinary.js'
import { serverResponse } from '../../utils/serverResponse.js'
import restaurantODM from '../odm/restaurantODM.js'

const allowedFormats = ['image/jpg', 'image/png', 'image/jpeg']

const getAll = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantODM.getAll()
    return serverResponse(res, {
      results: restaurants,
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
    const restaurant = await restaurantODM.getById(id)
    console.log(restaurant)

    return serverResponse(res, { results: restaurant, status: 'OK' })
  } catch (e: any) {
    return serverResponse(res, {
      error: true,
      status: 'BAD_REQUEST',
      message: e.errors
    })
  }
}

const createOne = async (req: Request, res: Response) => {
  const newRestaruant = req.body
  console.log(req.body)
  if (!req.file) {
    return serverResponse(res, {
      error: true,
      message: 'image is required',
      status: 'BAD_REQUEST'
    })
  }

  if (!allowedFormats.includes(req.file.mimetype)) {
    return serverResponse(res, {
      error: true,
      status: 'BAD_REQUEST',
      message: 'Invalid format'
    })
  }
  newRestaruant.image = req.file.path
  try {
    validationResult(req).throw()
    const createdRestaurant = await restaurantODM.createOne(newRestaruant)

    return serverResponse(res, {
      status: 'CREATED',
      results: createdRestaurant
    })
  } catch (e: any) {
    return serverResponse(res, {
      error: true,
      message: e.errors,
      status: 'BAD_REQUEST'
    })
  }
}

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params
  const restaurant = req.body
  console.log(restaurant)
  if (req.file) {
    if (!allowedFormats.includes(req.file.mimetype)) {
      return serverResponse(res, {
        error: true,
        status: 'BAD_REQUEST',
        message: 'Invalid format'
      })
    }
    restaurant.image = req.file.path
  }

  try {
    validationResult(req).throw()
    const updatedRestaurant = await restaurantODM.updateById(id, restaurant)
    return serverResponse(res, {
      results: updatedRestaurant,
      status: 'ACCEPTED'
    })
  } catch (e: any) {
    return serverResponse(res, {
      error: true,
      status: 'BAD_REQUEST',
      message: e.errors
    })
  }
}

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    validationResult(req).throw()
    const deletedRestaurant = await restaurantODM.deleteById(id)
    if (deletedRestaurant?.image) {
      await cloudinary.deleteFile(deletedRestaurant.image)
    }
    return serverResponse(res, {
      results: deletedRestaurant,
      status: 'ACCEPTED'
    })
  } catch (e: any) {
    return serverResponse(res, {
      error: true,
      status: 'BAD_REQUEST',
      message: e.errors
    })
  }
}

export default { getAll, getById, createOne, updateById, deleteById }
