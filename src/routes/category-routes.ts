import { Router, type Request, type Response } from 'express'
import { CategoryServices } from '../services/category-services'
import { authMiddleware } from '../middlaware/auth-middleware'

const categoryRouter = Router()
const categoryServices = new CategoryServices()

categoryRouter.use(authMiddleware)

categoryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await categoryServices.getAllCategories()

    res.status(200).json(categories)
  } catch (err) {
    res.status(400).send(err)
  }
})

categoryRouter.get('/most-sold', async (req: Request, res: Response) => {
  try {
    const mostSoldCtegories = await categoryServices.getMostSoldCategories()

    res.status(200).json(mostSoldCtegories)
  } catch (err) {
    res.status(400).send(err)
  }
})

categoryRouter.post('/', async (req: Request, res: Response) => {
  const { name } = req.body

  try {
    const newCategory = await categoryServices.createCategory({ name })

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
