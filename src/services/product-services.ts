import type { Product } from '@prisma/client'
import type {
  IProductServices,
  ProductWithSoldQuantity,
} from '../types/product-services'
import { prisma } from '../prisma/script'

class ProductServices implements IProductServices {
  async getAllProducts({
    businessId,
    limit,
    page,
  }: Pick<Product, 'businessId'> & { limit?: number; page?: number }): Promise<
    Product[]
  > {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      skip: limit && page ? (page - 1) * limit : 0,
      take: limit || 10,
      where: { businessId },
    })

    return products
  }

  async getMostSoldProducts({
    businessId,
  }: Pick<Product, 'businessId'>): Promise<ProductWithSoldQuantity[]> {
    const mostSoldProducts = await prisma.saleProduct.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      where: {
        product: {
          businessId,
        },
      },
    })

    const productIds = mostSoldProducts.map((product) => product.productId)

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        category: true,
      },
    })

    const mostSoldProductsWithQuantity = products.map((product) => {
      const totalQuantitySold =
        mostSoldProducts.find(
          (mostSoldProduct) => mostSoldProduct.productId === product.id,
        )?._sum.quantity || 0
      return {
        ...product,
        totalQuantitySold,
      }
    })

    const sortedBySoldQuantity = mostSoldProductsWithQuantity.sort(
      (a, b) => b.totalQuantitySold - a.totalQuantitySold,
    )

    return sortedBySoldQuantity
  }

  async createProduct({
    name,
    price,
    quantity,
    categoryId,
    businessId,
  }: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        quantity,
        categoryId,
        businessId,
      },
      include: {
        category: true,
      },
    })

    return newProduct
  }

  async updateProductCategory({
    id,
    categoryId,
  }: Pick<Product, 'id' | 'categoryId'>): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      data: {
        categoryId,
      },
      where: { id },
    })

    return updatedProduct
  }

  async deleteProduct({ id }: Pick<Product, 'id'>): Promise<Product> {
    const deletedProduct = await prisma.product.delete({ where: { id } })

    return deletedProduct
  }
}

export { ProductServices }
