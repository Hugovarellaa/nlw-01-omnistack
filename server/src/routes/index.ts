import { Router } from 'express'
import { knex } from '../database/connection'

export const appRoutes = Router()

appRoutes.get('/items', async (request, response) => {
	const items = await knex('items').select('*')

	const serializedItems = items.map((items) => {
		return {
			title: items.title,
			image_url: `http://localhost:3333/uploads/${items.image}`,
		}
	})

	return response.json(serializedItems)
})
