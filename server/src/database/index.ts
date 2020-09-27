import { Knex, knex as setupKnex } from 'knex'
import { resolve } from 'node:path'

export const knexConfig: Knex.Config = {
	client: 'sqlite',
	connection: {
		filename: resolve(__dirname, 'app.db'),
	},
	useNullAsDefault: true,

	migrations: {
		extension: 'ts',
		directory: resolve(__dirname, 'migrations'),
	},

	seeds: {
		extension: 'ts',
		directory: resolve(__dirname, 'seeds'),
	},
}

export const knex: Knex = setupKnex(knexConfig)
