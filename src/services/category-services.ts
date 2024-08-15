import type { Category } from '@prisma/client'
import { prisma } from '../prisma/script'
import type {
  CategoryWithQuantitySold,
  ICategoryServices,
} from '../types/category-services'
import { ProductServices } from './product-services'

const productServices = new ProductServices()

class CategoryServices implements ICategoryServices {
  async getAllCategories({
    businessId,
  }: Pick<Category, 'businessId'>): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: { businessId },
    })

    return categories
  }

  async getMostSoldCategories({
    businessId,
  }: Pick<Category, 'businessId'>): Promise<CategoryWithQuantitySold[]> {
    const mostSoldProducts = await productServices.getMostSoldProducts({
      businessId,
    })

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
