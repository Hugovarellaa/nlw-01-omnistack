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

	async show(request: Request, response: Response): Promise<Response> {
		const paramsSchema = z.object({
			id: z.string(),
		})

		const { id } = paramsSchema.parse(request.params)

		const point = await knex('points').where('id', id).first()
		if (!point) {
			return response.status(404).json({ error: 'points not found' })
		}

		/*
      SELECT * FROM items
        JOIN point_items ON item.id = point_items.item_id
      WHERE point_items.point_id = {ID}
    */
		const items = await knex('items')
			.join('point_items', 'items.id', '=', 'point_items.item_id')
			.where('point_items.point_id', id)
			.select('name')

		return response.json({ point, items })
	}
}
