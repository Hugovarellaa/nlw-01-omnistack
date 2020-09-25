import { Router } from 'express'
import { ItemsController } from '../controllers/ItemsController'
import { PointsController } from '../controllers/PointsController'

export const appRoutes = Router()

const pointsController = new PointsController()
const itemsController = new ItemsController()

appRoutes.get('/items', itemsController.index)

appRoutes.post('/points', pointsController.create)
appRoutes.get('/points/:id', pointsController.show)
