import { Router } from 'express'

export const appRoutes = Router()

appRoutes.get('/', (request, response) => {
	return response.json({ message: 'Server running' })
})
