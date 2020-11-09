import { Router } from 'express'
import { ItensController } from '../controllers/ItemsController'

export const itemsRoutes = Router()

const itensController = new ItensController()

itemsRoutes.get('/items', itensController.index)

// index -> list all
// show -> list specific items
// create -> create a new item
// update -> update
// delete -> delete
