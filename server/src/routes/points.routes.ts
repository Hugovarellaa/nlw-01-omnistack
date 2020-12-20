import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../config/multer'
import { PointsController } from '../controllers/PointsController'

export const pointsRoutes = Router()
const upload = multer(multerConfig)

const pointsController = new PointsController()

pointsRoutes.get('/points/', pointsController.index)
pointsRoutes.get('/points/:id', pointsController.show)

pointsRoutes.post('/points', upload.single('image'), pointsController.create)

// index -> list all
// show -> list specific items
// create -> create a new item
// update -> update
// delete -> delete
