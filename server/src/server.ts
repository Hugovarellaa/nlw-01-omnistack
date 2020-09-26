import express from 'express'
import { resolve } from 'node:path'

const app = express()
app.use(express.json())

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')))

app.listen(3333, () =>
	console.log('🚀🚀 Server running in port:', 3333, '🚀🚀'),
)
