import type { Sale } from '@prisma/client'

type SaleInput = {
  quantity: number
  id: number
}[]

type LimitType = {
  limit?: number
  page?: number
}

interface ISaleServices {
  getAllSales({
    businessId,
    limit,
    page,
  }: Pick<Sale, 'businessId'> & LimitType): Promise<{
    sales: Sale[]
    totalCount: number
  }>

  createSale({
    products,
    businessId,
  }: {
    products: SaleInput
    businessId: number
  }): Promise<Sale>
}

export type { ISaleServices, SaleInput, LimitType }
