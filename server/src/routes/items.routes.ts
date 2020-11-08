import { Router } from 'express'
import { ItensController } from '../controllers/ItemsController'

export const itemsRoutes = Router()

const itensController = new ItensController()

itemsRoutes.get('/items', itensController.show)
