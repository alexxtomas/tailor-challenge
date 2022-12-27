import bcrypt from 'bcrypt'
export function getUsers(restaurants) {
  const names = new Set()

  for (let { reviews } of restaurants) {
    for (let { name } of reviews) {
      names.add(name)
    }
  }
  const users = []
  names.forEach(async (username) => {
    const password = await bcrypt.hash(`${username}abc123`, 10)
    const email = `${username}abc123@gmail.com`
    users.push({ username, password, email })
  })
  return users
}
