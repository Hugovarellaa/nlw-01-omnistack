import { Knex, knex as setupKnex } from 'knex'
import { resolve } from 'node:path'

export const knexConfig: Knex.Config = {
	client: 'sqlite',
	connection: {
		// filename: ./src/database/app.db,
		filename: resolve(__dirname, 'app.db'),
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		// directory: ./src/database/migrations,
		directory: resolve(__dirname, 'migrations'),
	},
}

export const knex: Knex = setupKnex(knexConfig)
