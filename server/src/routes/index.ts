import { Router } from 'express'
import { knex } from '../database'

export const routes = Router()

routes.get('/', async (req, res) => {
	const test = await knex('sqlite_schema').select('*')

	return res.json(test)
})
