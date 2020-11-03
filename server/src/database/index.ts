import { Knex, knex as setupKnex } from 'knex'

export const knexConfig: Knex.Config = {
	client: 'sqlite',
	connection: {
		filename: './src/database/app.db',
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './src/database/migrations',
	},
}

export const knex: Knex = setupKnex(knexConfig)
