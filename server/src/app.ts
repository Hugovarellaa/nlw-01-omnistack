import express from 'express'
import { pointsRoutes } from './routes/points.routes'
import { resolve } from 'node:path'
import { itemsRoutes } from './routes/items.routes'
import cors from 'cors'

export const app = express()

app.use(express.json())
app.use(cors())

app.use(itemsRoutes)
app.use(pointsRoutes)

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')))
