import type { Sale, SaleProduct } from '@prisma/client'

type SaleInput = {
  quantity: number
  id: number
}[]

interface ISaleServices {
  getAllSales(): Promise<Sale[]>

  createSale({
    products,
    businessId,
  }: {
    products: SaleInput
    businessId: number
  }): Promise<SaleProduct>
}

export type { ISaleServices, SaleInput }
