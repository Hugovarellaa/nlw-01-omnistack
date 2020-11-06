import { Knex, knex as setupKnex } from 'knex'
import { resolve } from 'node:path'

export const knexConfig: Knex.Config = {
	client: 'sqlite',
	connection: {
		// filename: ./src/database/app.db,
		filename: resolve(__dirname, 'app.db'),
	},
	migrations: {
		extension: 'ts',
		// directory: ./src/database/migrations,
		directory: resolve(__dirname, 'migrations'),
	},
	seeds: {
		extension: 'ts',
		// directory: ./src/database/seeds,
		directory: resolve(__dirname, 'seeds'),
	},
	useNullAsDefault: true,
}

export const knex: Knex = setupKnex(knexConfig)
