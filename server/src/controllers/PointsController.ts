import { Request, Response } from 'express'
import { knex } from '../database/connection'

export class PointsController {
	async show(request: Request, response: Response) {
		const { id } = request.params

		const point = await knex('points').where({ id }).first()
		console.log(point)

		if (!point) {
			return response.status(400).json({ message: 'Point not found!' })
		}

		const items = await knex('items')
			.join('point_items', 'items.id', '=', 'point_items.item_id')
			.where('point_items.point_id', id)
			.select('items.title')

		return response.json({
			point,
			items,
		})
	}

	async create(request: Request, response: Response) {
		const { name, email, whatsapp, latitude, longitude, city, uf, items } =
			request.body

		const trx = await knex.transaction()

		const point = {
			image: 'faker',
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
		}

		const insertedIds = await trx('points').insert(point)

		const point_id = insertedIds[0]

		const pointItem = items.map((item_id: number) => {
			return {
				item_id,
				point_id,
			}
		})

		await trx('point_items').insert(pointItem)

		return response.status(201).json({
			id: point_id,
			...point,
		})
	}
}
