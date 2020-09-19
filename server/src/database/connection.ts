import { Knex, knex as setupKnex } from 'knex'
import { resolve } from 'path'

export const knexConfig: Knex.Config = {
	client: 'sqlite3',
	connection: {
		filename: resolve(__dirname, 'database.sqlite'),
	},
	useNullAsDefault: true,
}

export const knex: Knex = setupKnex(knexConfig)
