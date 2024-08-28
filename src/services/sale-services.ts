import type { Sale } from '@prisma/client'
import type { ISaleServices, SaleInput } from '../types/sale-services'
import { prisma } from '../prisma/script'

class SaleServices implements ISaleServices {
  async getAllSales({ businessId }: Pick<Sale, 'businessId'>): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: { businessId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    return sales
  }

  async createSale({
    products,
    businessId,
  }: {
    products: SaleInput
    businessId: number
  }): Promise<Sale> {
    const newSale = await prisma.sale.create({
      data: {
        businessId,
        products: {
          create: products.map((product) => ({
            quantity: product.quantity,
            product: {
              connect: { id: product.id },
            },
          })),
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    // const newSaleProduct = await prisma.saleProduct.findUnique({
    //   where: { id: newSale.id },
    // })

    return newSale!
  }
}

export { SaleServices }
