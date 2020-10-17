import { Request, Response } from 'express'
import { knex } from '../database'

export class PointsController {
	// Deve ser possível cria um ponto de coleta
	async create(request: Request, response: Response) {
		const { name, email, whatsapp, latitude, longitude, city, uf, items } =
			request.body

		const trx = await knex.transaction()
		// => Verificar como realizar e substituir aonde precisar

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

		const insertedIds = await trx('points').insert(point)

		const point_id = insertedIds[0]

		const pointItems = items.map((item_id: number) => {
			return {
				item_id,
				point_id,
			}
		})

		await trx('points_items').insert(pointItems)

		await trx.commit()

		return response.status(201).json({
			id: point_id,
			...point,
		})
	}

	// Deve ser possível Buscar um ponto especifico de coleta
	// Se nao existir o ponto retorna um erro
	async show(request: Request, response: Response) {
		const { id } = request.params

		const point = await knex('points').where({ id }).first()
		if (!point) {
			return response.status(400).json({ message: 'Point not found!' })
		}

		const items = await knex('items')
			.join('points_items', 'items.id', '=', 'points_items.item_id')
			.where('points_items.point_id', id)
			.select('items.name')

		return response.status(200).json({
			point,
			items,
		})
	}

	// Deve ser possível litar vários pontos de coletas
	// Deve ser possível filtrar por items
	// Deve ser possível filtrar por cidade
	// Deve ser possível filtrar por uf
	async index(request: Request, response: Response) {
		const { items, city, uf } = request.query

		const parsedItems = String(items)
			.split(',')
			.map((item) => Number(item.trim()))

		const point = await knex('points')
			.join('points_items', 'points.id', '=', 'points_items.point_id')
			.whereIn('points_items.item_id', parsedItems)
			.where('city', String(city))
			.where('uf', String(uf))
			.distinct()
			.select('points.*')

		return response.status(200).json(point)
	}
}
