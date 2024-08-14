import type { Product } from '@prisma/client'

interface IProductServices {
  getAllProducts(): Promise<Product[]>

  createProduct({
    name,
    price,
    quantity,
    categoryId,
  }: Omit<Product, 'id'>): Promise<Product>

  updateProductCategory({
    id,
    categoryId,
  }: Pick<Product, 'id' | 'categoryId'>): Promise<Product>

  deleteProduct({ id }: Pick<Product, 'id'>): Promise<Product>
}

export type { IProductServices }
