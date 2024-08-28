import type { Sale } from '@prisma/client'

type SaleInput = {
  quantity: number
  id: number
}[]

interface ISaleServices {
  getAllSales({ businessId }: Pick<Sale, 'businessId'>): Promise<Sale[]>

  createSale({
    products,
    businessId,
  }: {
    products: SaleInput
    businessId: number
  }): Promise<Sale>
}

export type { ISaleServices, SaleInput }
