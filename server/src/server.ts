import cors from 'cors'
import express from 'express'
import { resolve } from 'node:path'
import { appRoutes } from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(appRoutes)

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')))

app.listen(3333, () =>
	console.log('🚀🚀 Server running in port:', 3333, '🚀🚀'),
)
