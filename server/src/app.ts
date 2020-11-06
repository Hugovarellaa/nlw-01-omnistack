import express from 'express'
import { pointsRoutes } from './routes/points.routes'

export const app = express()

app.use(express.json())
app.use(pointsRoutes)
