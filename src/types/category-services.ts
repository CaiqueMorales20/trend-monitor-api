import type { Category } from '@prisma/client'

interface ICategoryServices {
  getAllCategories(): Promise<Category[]>
  createCategory({ name }: { name: string }): Promise<Category>
}

export type { ICategoryServices }
