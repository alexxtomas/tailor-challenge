import app from './server/app.js'

const { PORT } = process.env

if (!PORT) {
  throw new Error('Please set a PORT in .env file')
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
