import type { Category } from '@prisma/client'

interface ICategoryServices {
  getAllCategories(): Promise<Category[]>
  createCategory({ name }: Pick<Category, 'name'>): Promise<Category>
  deleteCategory({ id }: Pick<Category, 'id'>): Promise<Category>
}

export type { ICategoryServices }
