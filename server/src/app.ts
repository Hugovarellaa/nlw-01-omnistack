import cors from 'cors'
import express from 'express'
import { resolve } from 'node:path'
import { itemsRoutes } from './routes/items.routes'
import { pointsRoutes } from './routes/points.routes'

export const app = express()

app.use(express.json())
app.use(cors())

app.use(itemsRoutes)
app.use(pointsRoutes)

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')))
