import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('items', (table) => {
		table.increments('id').primary().notNullable()
		table.string('image').notNullable()
		table.string('name').notNullable()
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('items')
}
