import mongoose from 'mongoose'
import URI from './URI.js'

export async function connection() {
  try {
    const db = await mongoose.set('strictQuery', false).connect(URI)
    console.log('Connnected to', db.connection.name)
  } catch (err) {
    console.error(err)
  }
}
