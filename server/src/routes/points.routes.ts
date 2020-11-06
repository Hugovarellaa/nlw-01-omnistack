import { Router } from 'express'
import { knex } from '../database'

export const pointsRoutes = Router()

pointsRoutes.get('/', async (req, res) => {
	const test = await knex('points').select('*')

	return res.json(test)
})
