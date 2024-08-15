import type { Category } from '@prisma/client'

type CategoryWithQuantitySold = Category & {
  totalQuantitySold: number
}

interface ICategoryServices {
  getAllCategories({
    businessId,
  }: Pick<Category, 'businessId'>): Promise<Category[]>
  getMostSoldCategories({
    businessId,
  }: Pick<Category, 'businessId'>): Promise<CategoryWithQuantitySold[]>
  createCategory({
    name,
  }: Pick<Category, 'name' | 'businessId'>): Promise<Category>
  deleteCategory({ id }: Pick<Category, 'id'>): Promise<Category>
}

export type { ICategoryServices, CategoryWithQuantitySold }
