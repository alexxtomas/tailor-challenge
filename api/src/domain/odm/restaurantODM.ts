import RestaurantModel, { Restaurant } from '../entities/Restaurant/index.js'

const getAll = async () => {
  try {
    return await RestaurantModel.find()
  } catch (e) {
    console.error(e)
  }
}

const getById = async (id: string) => {
  try {
    return await RestaurantModel.findOne({ _id: id })
  } catch (e) {
    console.error(e)
  }
}

const getByName = async (name: string) => {
  try {
    return await RestaurantModel.findOne({ name })
  } catch (e) {
    console.error(e)
  }
}

const getByAdress = async (address: string) => {
  try {
    return await RestaurantModel.findOne({ address })
  } catch (e) {
    console.error(e)
  }
}

const createOne = async (newRestaurant: Restaurant) => {
  try {
    return await new RestaurantModel(newRestaurant).save()
  } catch (e) {
    console.error(e)
  }
}

type ToUpdateParam<T> = { [K in keyof T]?: T[K] }

const updateById = async (id: string, toUpdate: ToUpdateParam<Restaurant>) => {
  try {
    return await RestaurantModel.findByIdAndUpdate(id, toUpdate, {
      new: true
    })
  } catch (e) {
    console.error(e)
  }
}

const deleteById = async (id: string) => {
  try {
    return await RestaurantModel.findByIdAndDelete(id)
  } catch (e) {
    console.error(e)
  }
}

export default {
  getAll,
  getById,
  getByName,
  getByAdress,
  createOne,
  updateById,
  deleteById
}
