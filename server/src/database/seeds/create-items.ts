import { Knex } from 'knex'

export async function seed(knex: Knex) {
	await knex('items').insert([
		{ name: 'Lâmpadas', image: 'lampadas.svg' },
		{ name: 'Pilhas e Baterias', image: 'baterias.svg' },
		{ name: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
		{ name: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
		{ name: 'Resíduos Orgânicos', image: 'organicos.svg' },
		{ name: 'Óleo de Cozinha', image: 'oleo.svg' },
	])
}
