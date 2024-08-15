import type { Business } from '@prisma/client'
import type { IBusinessServices } from '../types/business-services'
import { prisma } from '../prisma/script'

class BusinessServices implements IBusinessServices {
  async getAllBusiness(): Promise<Business[]> {
    const business = await prisma.business.findMany()

    return business
  }

  async getBusinessById({
    id,
  }: Pick<Business, 'id'>): Promise<Business | null> {
    const business = await prisma.business.findUnique({ where: { id } })

    return business
  }

  async createBusiness({
    name,
    email,
    password,
  }: Omit<Business, 'id'>): Promise<Business> {
    const business = await prisma.business.create({
      data: {
        email,
        name,
        password,
      },
    })

    return business
  }

  async updateBusiness({
    id,
    email,
    name,
    password,
  }: Business): Promise<Business> {
    const business = await prisma.business.update({
      data: {
        email,
        name,
        password,
      },
      where: {
        id,
      },
    })

    return business
  }

  async deleteBusiness({ id }: Pick<Business, 'id'>): Promise<Business> {
    const business = await prisma.business.delete({ where: { id } })

    return business
  }
}

export { BusinessServices }
