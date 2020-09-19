import { Router } from 'express'
import { knex } from '../database/connection'

export const appRoutes = Router()

appRoutes.get('/', async (request, response) => {
	const te = await knex('sqlite_schema').select('*')

	return response.json(te)
})
