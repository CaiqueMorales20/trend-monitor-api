import type { Sale } from '@prisma/client'
import type {
  ISaleServices,
  LimitType,
  SaleInput,
} from '../types/sale-services'
import { prisma } from '../prisma/script'

class SaleServices implements ISaleServices {
  async getAllSales({
    businessId,
    limit,
    page,
  }: Pick<Sale, 'businessId'> & LimitType): Promise<{
    sales: Sale[]
    totalCount: number
  }> {
    const sales = await prisma.sale.findMany({
      where: { businessId },
      skip: limit && page ? (page - 1) * limit : 0,
      take: limit || 10,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    })
    const totalCount = await prisma.sale.count({
      where: { businessId },
    })

    return { sales, totalCount }
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

    await Promise.all(
      products.map(({ id, quantity }) =>
        prisma.product.update({
          where: { id },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        }),
      ),
    )

    // const newSaleProduct = await prisma.saleProduct.findUnique({
    //   where: { id: newSale.id },
    // })

    return newSale!
  }
}

export { SaleServices }
