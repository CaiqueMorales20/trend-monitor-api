import { Router, type Request, type Response } from 'express'
import { CategoryServices } from '../services/category-services'
import { authMiddleware } from '../middlaware/auth-middleware'
import type { Category } from '@prisma/client'

const categoryRouter = Router()
const categoryServices = new CategoryServices()

interface CustomRequest extends Request {
  user?: {
    businessId: number
  }
}

categoryRouter.use(authMiddleware)

categoryRouter.get('/', async (req: CustomRequest, res: Response) => {
  const businessId = req.user!.businessId

  try {
    const categories = await categoryServices.getAllCategories({
      businessId,
    })

    res.status(200).json(categories)
  } catch (err) {
    res.status(400).send(err)
  }
})

categoryRouter.get('/most-sold', async (req: CustomRequest, res: Response) => {
  const businessId = req.user!.businessId

  try {
    const mostSoldCtegories = await categoryServices.getMostSoldCategories({
      businessId,
    })

    res.status(200).json(mostSoldCtegories)
  } catch (err) {
    res.status(400).send(err)
  }
})

categoryRouter.post('/', async (req: CustomRequest, res: Response) => {
  const { name } = req.body as Pick<Category, 'name'>

  try {
    const newCategory = await categoryServices.createCategory({
      name,
      businessId: req.user!.businessId,
    })

    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).send(err)
  }
})

categoryRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const deletedCategory = await categoryServices.deleteCategory({ id })

    res.status(200).json(deletedCategory)
  } catch (err) {
    res.status(400).send(err)
  }
})

export { categoryRouter }
