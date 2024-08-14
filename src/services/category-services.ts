import type { Category } from '@prisma/client'
import { prisma } from '../prisma/script'
import type { ICategoryServices } from '../types/category-services'

class CategoryServices implements ICategoryServices {
  async getAllCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany()

    return categories
  }

  async createCategory({ name }: { name: string }): Promise<Category> {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    })

    return newCategory
  }

  async deleteCategory({ id }: Pick<Category, 'id'>): Promise<Category> {
    const deletedCategory = await prisma.category.delete({ where: { id } })

    return deletedCategory
  }
}

export { CategoryServices }
