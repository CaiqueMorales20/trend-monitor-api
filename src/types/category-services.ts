import type { Category } from '@prisma/client'

type CategoryWithQuantitySold = Category & {
  totalQuantitySold: number
}

interface ICategoryServices {
  getAllCategories(): Promise<Category[]>
  getMostSoldCategories(): Promise<CategoryWithQuantitySold[]>
  createCategory({ name }: Pick<Category, 'name'>): Promise<Category>
  deleteCategory({ id }: Pick<Category, 'id'>): Promise<Category>
}

export type { ICategoryServices, CategoryWithQuantitySold }
