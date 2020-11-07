import express from 'express'
import { pointsRoutes } from './routes/points.routes'
import { resolve } from 'node:path'
import { itemsRoutes } from './routes/items.routes'

export const app = express()

app.use(express.json())

app.use(itemsRoutes)
app.use(pointsRoutes)

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')))
