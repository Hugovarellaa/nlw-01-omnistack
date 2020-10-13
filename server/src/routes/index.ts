import { Router } from 'express'
import { PointsController } from '../controllers/PointsController'
import { knex } from '../database'

export const appRoutes = Router()
const pointsController = new PointsController()

appRoutes.get('/items', async (req, res) => {
	const items = await knex('items').select()

	const serializedItems = items.map((item) => {
		return {
			id: item.id,
			name: item.name,
			image_url: `http://localhost:3333/uploads/${item.image}`,
		}
	})

	return res.json(serializedItems)
})

appRoutes.post('/points', pointsController.create)
