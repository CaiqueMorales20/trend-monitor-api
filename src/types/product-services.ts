import type { Category, Product } from '@prisma/client'

type ProductWithSoldQuantity = Product & {
  category: Category
  totalQuantitySold: number
}

interface IProductServices {
  getAllProducts({
    businessId,
  }: Pick<Product, 'businessId'>): Promise<Product[]>

  getMostSoldProducts({
    businessId,
  }: Pick<Product, 'businessId'>): Promise<ProductWithSoldQuantity[]>

  createProduct({
    name,
    price,
    quantity,
    categoryId,
    businessId,
  }: Omit<Product, 'id'>): Promise<Product>

  updateProductCategory({
    id,
    categoryId,
  }: Pick<Product, 'id' | 'categoryId'>): Promise<Product>

  deleteProduct({ id }: Pick<Product, 'id'>): Promise<Product>
}

export type { IProductServices, ProductWithSoldQuantity }
