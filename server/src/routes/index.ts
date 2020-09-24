import { Router } from 'express'
import { knex } from '../database/connection'

export const appRoutes = Router()

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
	const { name, email, whatsapp, latitude, longitude, city, uf, items } =
		request.body

	await knex('points').insert({
		image: 'faker',
		name,
		email,
		whatsapp,
		latitude,
		longitude,
		city,
		uf,
	})

	return response.status(201).json({ message: 'Success' })
})
