import fs from 'fs'

export function getRestaurants() {
  const path = import.meta.url
    .replace('getRestaurants.js', 'restaurants.json')
    .replace('file:///', '')
  const restaurantsJSON = fs.readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(restaurantsJSON)
}
