import type { Business } from '@prisma/client'
import type { IAuthServices } from '../types/auth-services'
import jwt from 'jsonwebtoken'
import { BusinessServices } from './business-services'

const businessServices = new BusinessServices()

class AuthServices implements IAuthServices {
  async login({
    name,
    password,
  }: Pick<Business, 'name' | 'password'>): Promise<string | null> {
    const businesses = await businessServices.getAllBusiness()

    const business = businesses.find(
      (business) => business.name === name && business.password === password,
    )

    if (!business) return null

    const secretKey = process.env.JWT_SECRET_KEY!
    const token = jwt.sign(
      { businessId: business.id, name: business.name },
      secretKey,
      { expiresIn: '1h' },
    )

    return token
  }
}

export { AuthServices }
