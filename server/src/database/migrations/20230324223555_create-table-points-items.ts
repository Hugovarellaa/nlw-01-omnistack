import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('point_items', (table) => {
		table.uuid('id').primary()
		table.uuid('point_id').references('id').inTable('points')
		table.uuid('item_id').references('id').inTable('items')
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('point_items')
}
