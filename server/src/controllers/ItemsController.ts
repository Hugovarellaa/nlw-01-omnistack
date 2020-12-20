import { Request, Response } from 'express'
import { knex } from '../database'

export class ItensController {
	async index(request: Request, response: Response) {
		const items = await knex('items').select('*')

		const serializedItems = items.map((item) => {
			return {
				id: item.id,
				name: item.name,
				// image_url: `http://localhost:3333/uploads/${item.image}`,
				image_url: `http://192.168.1.5:3333/uploads/${item.image}`,
			}
		})

		return response.json(serializedItems)
	}
}
