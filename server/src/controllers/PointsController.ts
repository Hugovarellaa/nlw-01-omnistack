import { Request, Response } from 'express'
import { knex } from '../database'
import { z } from 'zod'

export class PointsController {
	async create(request: Request, response: Response): Promise<Response> {
		const createBodySchema = z.object({
			name: z.string(),
			email: z.string(),
			city: z.string(),
			uf: z.string(),
			whatsapp: z.string(),
			latitude: z.number(),
			longitude: z.number(),
			items: z.number().array(),
		})

		const { name, email, city, uf, whatsapp, latitude, longitude, items } =
			createBodySchema.parse(request.body)

		// const trx = await knex.transaction()

		const points = await knex('points')
			.insert({
				image: 'image faker',
				name,
				email,
				whatsapp,
				city,
				uf,
				latitude,
				longitude,
			})
			.returning('*')

		const point_id = points[0].id

		const pointItems = items.map((item_id: number) => {
			return {
				item_id,
				point_id,
			}
		})

		await knex('point_items').insert(pointItems)

		return response.status(201).json(points)
	}
}
