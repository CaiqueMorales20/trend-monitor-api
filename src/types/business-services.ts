import type { Business } from '@prisma/client'

interface IBusinessServices {
  getAllBusiness(): Promise<Business[]>
  getBusinessById({ id }: Pick<Business, 'id'>): Promise<Business | null>
  createBusiness({
    name,
    email,
    password,
  }: Omit<Business, 'id'>): Promise<Business>
  deleteBusiness({ id }: Pick<Business, 'id'>): Promise<Business>
  updateBusiness({ id, email, name, password }: Business): Promise<Business>
}

export type { IBusinessServices }
