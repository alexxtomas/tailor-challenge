import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'
// import { initializeData } from '../../../dbSeedingV2/index.js'
import '../db/connection.js'
// import Restaurant from '../models/Restaurant.js'
// import User from '../models/User.js'
import { initializeData } from '../../../dbSeedingV2/index.js'
import Restaurant from '../models/Restaurant.js'
import User from '../models/User.js'
import authRoutes from '../routes/auth.routes.js'
import restaurantsRoutes from '../routes/restaurants.routes.js'
import usersRouter from '../routes/users.routes.js'
import cloudinary from '../services/cloudinary.js'
const app: Application = express()

await initializeData(Restaurant, User)

cloudinary.setUp()
// await initializeData(Restaurant, User)
app.set('port', process.env.PORT ?? 3001)
await initializeData(Restaurant, User)
// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/restaurants', restaurantsRoutes)
app.use('/api/users', usersRouter)

export default app
