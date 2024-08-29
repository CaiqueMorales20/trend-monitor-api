import { Router, type Request, type Response } from 'express'
import { SaleServices } from '../services/sale-services'
import type { SaleInput } from '../types/sale-services'
import { authMiddleware } from '../middlaware/auth-middleware'

const saleRouter = Router()
const saleServices = new SaleServices()

interface CustomRequest extends Request {
  user?: {
    businessId: number
  }
}

saleRouter.use(authMiddleware)

saleRouter.get('/', async (req: CustomRequest, res: Response) => {
  const businessId = req.user!.businessId
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  try {
    const sales = await saleServices.getAllSales({ businessId, limit, page })

    res.status(200).json(sales)
  } catch (err) {
    res.status(400).send(err)
  }
})

saleRouter.post('/', async (req: CustomRequest, res: Response) => {
  const { products } = req.body as { products: SaleInput }
  const businessId = req.user!.businessId

  try {
    const newSale = await saleServices.createSale({ products, businessId })

    res.status(200).json(newSale)
  } catch (err) {
    res.status(400).send(err)
  }
})

export { saleRouter }
