import { Router, type Request, type Response } from 'express'
import { AuthServices } from '../services/auth-services'
import type { Business } from '@prisma/client'

const authRoutes = Router()
const authServices = new AuthServices()

authRoutes.post('/login', async (req: Request, res: Response) => {
  const { name, password } = req.body as Pick<Business, 'name' | 'password'>

  try {
    const jwtToken = await authServices.login({ name, password })

    res.status(200).json(jwtToken)
  } catch (err) {
    res.status(400).send(err)
  }
})

export { authRoutes }
