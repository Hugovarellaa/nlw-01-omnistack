import { Router } from 'express'
import { PointsController } from '../controllers/PointsController'

export const pointsRoutes = Router()

const pointsController = new PointsController()

pointsRoutes.post('/points', pointsController.create)
