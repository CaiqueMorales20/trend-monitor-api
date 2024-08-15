import { Router, type Request, type Response } from 'express'
import { ProductServices } from '../services/product-services'
import type { Product } from '@prisma/client'

const productRouter = Router()
const productServices = new ProductServices()

productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProducts()

    res.status(200).json(products)
  } catch (err) {
    res.status(400).send(err)
  }
})

productRouter.get('/most-sold', async (req: Request, res: Response) => {
  try {
    const mostSoldProducts = await productServices.getMostSoldProducts()

    res.status(200).json(mostSoldProducts)
  } catch (err) {
    res.status(400).send(err)
  }
})

productRouter.post('/', async (req: Request, res: Response) => {
  const { name, price, quantity, categoryId } = req.body as Product

  try {
    const product = await productServices.createProduct({
      name,
      price,
      quantity,
      categoryId,
    })

    res.status(200).json(product)
  } catch (err) {
    res.status(400).send(err)
  }
})

productRouter.patch('/:id', async (req: Request, res: Response) => {
  const { categoryId } = req.body as Pick<Product, 'categoryId'>
  const id = Number(req.params.id)

  try {
    const updatedProduct = await productServices.updateProductCategory({
      categoryId,
      id,
    })

    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(400).send(err)
  }
})

productRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const deletedProduct = await productServices.deleteProduct({ id })

    res.status(200).json(deletedProduct)
  } catch (err) {
    res.status(400).send(err)
  }
})

export { productRouter }
