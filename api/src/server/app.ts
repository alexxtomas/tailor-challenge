import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { connection } from '../domain/repositories/connection.js'
import { routes } from '../routes/index.js'
import cloudinary from '../services/cloudinary.js'
dotenv.config()

await connection()

const app = express()

cloudinary.setUp()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

routes('/api/v1', app)

export default app
