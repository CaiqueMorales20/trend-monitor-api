import type { Product } from '@prisma/client'
import type { IProductServices } from '../types/product-services'
import { prisma } from '../prisma/script'

class ProductServices implements IProductServices {
  async getAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    })

    return products
  }

  async createProduct({
    name,
    price,
    quantity,
    categoryId,
  }: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        quantity,
        categoryId,
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
