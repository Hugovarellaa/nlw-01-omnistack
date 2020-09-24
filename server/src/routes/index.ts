import { Router } from 'express'
import { PointsController } from '../controllers/PointsController'
import { knex } from '../database/connection'

export const appRoutes = Router()
const pointsController = new PointsController()

appRoutes.get('/items', async (request, response) => {
	const items = await knex('items').select('*')

	const serializedItems = items.map((items) => {
		return {
			id: items.id,
			title: items.title,
			image_url: `http://localhost:3333/uploads/${items.image}`,
		}
	})

	return response.json(serializedItems)
})

appRoutes.post('/points', async (request, response) => {
	pointsController.handler(request, response)
})
