import { Router, type Request, type Response } from 'express'
import { SaleServices } from '../services/sale-services'
import type { SaleInput } from '../types/sale-services'

const saleRouter = Router()
const saleServices = new SaleServices()

saleRouter.get('/', async (req: Request, res: Response) => {
  try {
    const sales = await saleServices.getAllSales()

    res.status(200).json(sales)
  } catch (err) {
    res.status(400).send(err)
  }
})

saleRouter.post('/', async (req: Request, res: Response) => {
  const { products } = req.body as { products: SaleInput }

  try {
    const newSale = await saleServices.createSale({ products })

    res.status(200).json(newSale)
  } catch (err) {
    res.status(400).send(err)
  }
})

export { saleRouter }
