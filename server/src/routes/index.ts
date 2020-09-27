import { Router } from 'express'
import { knex } from '../database'

export const appRoutes = Router()

appRoutes.get('/', async (req, res) => {
	const te = await knex('sqlite_schema').select()

	return res.json(te)
})

appRoutes.post('/', (req, res) => {})
