import express from 'express'
import { routes } from './routes'

export const app = express()

app.use(express.json())
app.use(routes)
