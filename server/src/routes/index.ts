import { Router } from 'express'
import { ItemsController } from '../controllers/ItemsController'
import { PointsController } from '../controllers/PointsController'

export const appRoutes = Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()

appRoutes.get('/items', itemsController.index)

appRoutes.get('/points', pointsController.index)
appRoutes.get('/points/:id', pointsController.show)
appRoutes.post('/points', pointsController.create)
