import type { Category } from '@prisma/client'
import { prisma } from '../prisma/script'
import type {
  CategoryWithQuantitySold,
  ICategoryServices,
} from '../types/category-services'
import { ProductServices } from './product-services'

const productServices = new ProductServices()

class CategoryServices implements ICategoryServices {
  async getAllCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany()

    return categories
  }

  async getMostSoldCategories(): Promise<CategoryWithQuantitySold[]> {
    const mostSoldProducts = await productServices.getMostSoldProducts()

    const mostSoldCategories = mostSoldProducts.map((product) => ({
      ...product.category,
      totalQuantitySold: product.totalQuantitySold,
    }))

    return mostSoldCategories
  }

  async createCategory({
    name,
    businessId,
  }: Pick<Category, 'name' | 'businessId'>): Promise<Category> {
    const newCategory = await prisma.category.create({
      data: {
        name,
        businessId,
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
