import { Router } from 'express'
import { knex } from '../database'

export const appRoutes = Router()

appRoutes.get('/items', async (req, res) => {
	const items = await knex('items').select()

	const serializedItems = items.map((item) => {
		return {
			name: item.name,
			image_url: `http://localhost:3333/uploads/${item.image}`,
		}
	})

	return res.json(serializedItems)
})

appRoutes.post('/', (req, res) => {})
