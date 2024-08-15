import type { Business } from '@prisma/client'

interface IAuthServices {
  login({
    name,
    password,
  }: Pick<Business, 'name' | 'password'>): Promise<string | null>
}

export type { IAuthServices }
