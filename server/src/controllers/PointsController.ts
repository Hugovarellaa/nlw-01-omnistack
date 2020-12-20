import { Request, Response } from 'express'
import { z } from 'zod'
import { knex } from '../database'

export class PointsController {
	async create(request: Request, response: Response): Promise<Response> {
		const createBodySchema = z.object({
			name: z.string(),
			email: z.string(),
			city: z.string(),
			uf: z.string(),
			whatsapp: z.string(),
			latitude: z.coerce.number(),
			longitude: z.coerce.number(),
			items: z.string(),
		})

		const { name, email, city, uf, whatsapp, latitude, longitude, items } =
			createBodySchema.parse(request.body)

		const trx = await knex.transaction()

		const points = await trx('points')
			.insert({
				image: request.file?.filename,
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

		const pointItems = items
			.split(',')
			.map((item: string) => Number(item.trim()))
			.map((item_id: number) => {
				return {
					item_id,
					point_id,
				}
			})

		const serializedPoints = points.map((point) => {
			return {
				...points,
				// image_url: `http://localhost:3333/uploads/${point.image}`,
				image_url: `http://192.168.1.5:3333/uploads/${point.image}`,
			}
		})

		await trx('point_items').insert(pointItems)

		await trx.commit()

		return response.status(201).json({ points, serializedPoints })
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

		const serializedPoint = {
			...point,
			// image_url: `http://localhost:3333/uploads/${point.image}`,
			image_url: `http://192.168.1.5:3333/uploads/${point.image}`,
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

		return response.json({ point: serializedPoint, items })
	}

	async index(request: Request, response: Response): Promise<Response> {
		const queryParamsSchema = z.object({
			city: z.string(),
			uf: z.string(),
			items: z.coerce.string(),
		})

		const { city, items, uf } = queryParamsSchema.parse(request.query)

		const parsedItems = items.split(',').map((item) => Number(item.trim()))

		const points = await knex('points')
			.join('point_items', 'points.id', '=', 'point_items.point_id')
			.whereIn('point_items.item_id', parsedItems)
			.where('city', city)
			.where('uf', uf)
			.distinct()
			.select('points.*')

		return response.json(points)
	}
}
