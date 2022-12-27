import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import Restaurant from '../models/Restaurant.js'
import cloudinary from '../services/cloudinary.js'
import allowedFormats from '../utils/allowedFormats.js'

export async function getAllController(req: Request, res: Response) {
  try {
    const restaurants = await Restaurant.find()
    return res.status(200).json(restaurants)
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Something went wrong. Internal Server Error' })
  }
}

export async function getByIdController(req: Request, res: Response) {
  try {
    validationResult(res).throw()
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
    return res.status(200).json(restaurant)
  } catch (err: any) {
    return res.status(400).json(err.errors)
  }
}

export async function createController(req: Request, res: Response) {
  try {
    validationResult(req).throw()
    const newRestaurant = new Restaurant(req.body)
    const { file } = req
    if (!file) {
      return res.status(400).json({ error: 'Missing File' })
    }
    if (!allowedFormats.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid format' })
    }
    newRestaurant.image = file.path
    const savedRestaurant = await newRestaurant.save()
    return res.status(201).json(savedRestaurant)
  } catch (err: any) {
    console.log(err)
    return res.status(400).json(err.errors)
  }
}

export async function updateController(req: Request, res: Response) {
  console.log(req.body)
  try {
    console.log(req.body)
    const { id } = req.params
    const updatedRestaurant = req.body
    console.log(updatedRestaurant)
    if (req.file) {
      updatedRestaurant.image = req.file.path
    }
    const restaurantDB = await Restaurant.findByIdAndUpdate(
      id,
      updatedRestaurant,
      { new: true }
    )
    if (restaurantDB?.image) await cloudinary.deleteFile(restaurantDB?.image)

    if (!restaurantDB) {
      return res.status(400).json({ error: 'Restaurant not found' })
    }
    return res.status(200).json(updatedRestaurant)
  } catch (err) {
    console.error(err)
  }
}

export async function deleteController(req: Request, res: Response) {
  try {
    validationResult(res).throw()
    const { id } = req.params
    const deletedRestaurant = await Restaurant.findByIdAndRemove(id)
    if (deletedRestaurant?.image)
      await cloudinary.deleteFile(deletedRestaurant.image)
    return res.status(200).json(deletedRestaurant)
  } catch (err: any) {
    return res.status(400).json(err.errors)
  }
}
