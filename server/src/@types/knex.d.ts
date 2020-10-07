// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
	export interface Tables {
		points: {
			id: string
			image: string
			name: string
			email: number
			whatsapp: string
			latitude: number
			longitude: number
			city: string
			uf: string
		}
		items: {
			id: string
			image: string
			name: string
		}
		points_items: {
			id: string
			point_id: string
			item_id: string
		}
	}
}
