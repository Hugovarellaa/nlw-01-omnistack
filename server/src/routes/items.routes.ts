import { Router } from 'express'
import { knex } from '../database'

export const itemsRoutes = Router()

itemsRoutes.get('/items', async (request, response) => {
	const items = await knex('items').select('*')

	const serializedItems = items.map((item) => {
		return {
			name: item.name,
			image_url: `http://localhost:3333/uploads/${item.image}`,
		}
	})

	return response.json(serializedItems)
})
