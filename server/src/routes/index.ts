import { Router } from 'express'
import { knex } from '../database'

export const appRoutes = Router()

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

appRoutes.post('/points', async (req, res) => {
	const { name, email, whatsapp, latitude, longitude, city, uf, items } =
		req.body

	const trx = await knex.transaction()

	const insertedIds = await trx('points').insert({
		image: 'fake',
		name,
		email,
		whatsapp,
		latitude,
		longitude,
		city,
		uf,
	})

	const point_id = insertedIds[0]

	const pointItems = items.map((item_id: number) => {
		return {
			item_id,
			point_id,
		}
	})

	await trx('points_items').insert(pointItems)

	return res.status(201).json({ ok: true })
})
