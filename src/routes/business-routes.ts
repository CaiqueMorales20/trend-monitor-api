import { Router, type Request, type Response } from 'express'
import { BusinessServices } from '../services/business-services'
import { authMiddleware } from '../middlaware/auth-middleware'
import type { Business } from '@prisma/client'

const businessRouter = Router()
const businessServices = new BusinessServices()

businessRouter.use(authMiddleware)

businessRouter.get('/', async (req: Request, res: Response) => {
  try {
    const business = await businessServices.getAllBusiness()

    res.status(200).json(business)
  } catch (err) {
    res.status(400).send(err)
  }
})

businessRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const business = await businessServices.getBusinessById({ id })

    res.status(200).json(business)
  } catch (err) {
    res.status(400).send(err)
  }
})

businessRouter.post('/', async (req: Request, res: Response) => {
  const { email, name, password } = req.body as Omit<Business, 'id'>

  try {
    const business = await businessServices.createBusiness({
      email,
      name,
      password,
    })

    res.status(200).json(business)
  } catch (err) {
    res.status(400).send(err)
  }
})

businessRouter.put('/:id', async (req: Request, res: Response) => {
  const { email, name, password } = req.body as Omit<Business, 'id'>
  const id = Number(req.params.id)

  try {
    const business = await businessServices.updateBusiness({
      id,
      email,
      name,
      password,
    })

    res.status(200).json(business)
  } catch (err) {
    res.status(400).send(err)
  }
})

businessRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const business = await businessServices.deleteBusiness({ id })

    res.status(200).json(business)
  } catch (err) {
    res.status(400).send(err)
  }
})

export { businessRouter }
