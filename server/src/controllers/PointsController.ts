import { Request, Response } from 'express'
import { knex } from '../database'

export class PointsController {
	async create(request: Request, response: Response) {
		const { name, email, whatsapp, latitude, longitude, city, uf, items } =
			request.body

		// const trx = knex.transaction() => Verificar como realizar e substituir aonde precisar

		const point = {
			image: 'fake',
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
		}

		const insertedIds = await knex('points').insert(point)

		const point_id = insertedIds[0]

		const pointItems = items.map((item_id: number) => {
			return {
				item_id,
				point_id,
			}
		})

		await knex('points_items').insert(pointItems)

		return response.status(201).json({
			id: point_id,
			...point,
		})
	}
}
