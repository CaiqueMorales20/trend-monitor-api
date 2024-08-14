import type { Sale, SaleProduct } from '@prisma/client'
import type { ISaleServices, SaleInput } from '../types/sale-services'
import { prisma } from '../prisma/script'

class SaleServices implements ISaleServices {
  async getAllSales(): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
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
  }: {
    products: SaleInput
  }): Promise<SaleProduct> {
    const newSale = await prisma.sale.create({
      data: {
        products: {
          create: products.map((product) => ({
            quantity: product.quantity,
            product: {
              connect: { id: product.id },
            },
          })),
        },
      },
    })

    const newSaleProduct = await prisma.saleProduct.findUnique({
      where: { id: newSale.id },
    })

    return newSaleProduct!
  }
}

export { SaleServices }
