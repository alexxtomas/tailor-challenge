import { getRestaurants } from './getRestaurants.js'
import { getUsers } from './getUsers.js'

export async function initializeData(Restaurant, User) {
  try {
    const restaurantsCount = await Restaurant.estimatedDocumentCount()
    const usersCount = await User.estimatedDocumentCount()

    if (restaurantsCount > 0 || usersCount > 0) return

    const restaurants = getRestaurants()
    const users = getUsers(restaurants)

    await Restaurant.insertMany(restaurants)
    await User.insertMany(users)
  } catch (err) {
    console.error(err)
  }
}
