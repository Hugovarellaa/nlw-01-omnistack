import express from 'express'
import { appRoutes } from './routes'

const app = express()
app.use(express.json())
app.use(appRoutes)

app.listen(3333, () =>
	console.log('🚀🚀 Server running in port:', 3333, '🚀🚀'),
)
