import UserModel, { User } from '../entities/User/index.js'

const getAll = async () => {
  try {
    return await UserModel.find()
  } catch (e) {
    console.error(e)
  }
}

const getById = async (id: string) => {
  try {
    return await UserModel.findById(id)
  } catch (e) {
    console.error(e)
  }
}

const getByUsername = async (username: string) => {
  try {
    return await UserModel.findOne({ username })
  } catch (e) {
    console.error(e)
  }
}

const createOne = async (newUser: User) => {
  try {
    return await new UserModel(newUser).save()
  } catch (e) {
    console.error(e)
  }
}

type ToUpdateParam<T> = { [K in keyof T]?: T[K] }

const updateById = async (id: string, toUpdate: ToUpdateParam<User>) => {
  try {
    return await UserModel.findByIdAndUpdate(id, toUpdate, {
      new: true
    })
  } catch (e) {
    console.error(e)
  }
}

const deleteById = async (id: string) => {
  try {
    return await UserModel.findByIdAndDelete(id)
  } catch (e) {
    console.error(e)
  }
}

export default {
  getAll,
  getById,
  getByUsername,
  createOne,
  updateById,
  deleteById
}
