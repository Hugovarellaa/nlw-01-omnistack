import { Router } from 'express'

export const routes = Router()

routes.get('/', (req, res) => {
	const user = ['Hugo', 'Google', 'Fulano']

	return res.json(user)
})
