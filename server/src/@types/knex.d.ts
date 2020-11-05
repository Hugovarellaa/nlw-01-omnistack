/* eslint-disable no-unused-vars */
import { Knex } from 'knex'

declare module 'knex/types/tables' {
	interface Points {
		id: number
		image: string
		name: string
		email: string
		whatsapp: string
		latitude: number
		longitude: number
		city: string
		uf: string
	}

	interface Point_items {
		id: number
		point_id: number
		item_id: number
	}

	interface Items {
		id: number
		image: string
		name: string
	}

	interface Tables {
		points: Points
		items: Items
		point_items: Point_items
	}
}
