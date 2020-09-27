import { Router } from 'express'

export const appRoutes = Router()

appRoutes.get('/', (req, res) => {
	return res.json({ ok: true })
})
appRoutes.post('/', (req, res) => {})
