import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('point_items', (table) => {
		table.uuid('id').primary().notNullable()

		table.integer('point_id').notNullable().references('id').inTable('points')

		table.integer('item_id').notNullable().references('id').inTable('items')
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('point_items')
}
