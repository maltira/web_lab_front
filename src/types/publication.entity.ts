import type { UserEntity } from '@/types/user.entity.ts'

export interface PublicationEntity {
  id: string
  title: string
  description: string
  user_id: string
  background_color: string

  created_at: Date
  updated_at: Date

  User: UserEntity
  PublicationCategories: PublicationCategories[]
}

export interface Category {
  id?: string
  name: string
}

export interface PublicationCategories {
  id?: string
  publication_id?: string
  category_id?: string

  background_color: string;
  text_color: string;

  Category: Category
}

export interface PublicationRequest {
  title: string
  description: string
  user_id: string
  background_color?: string

  categories: Array<PublicationCategories>
}
export interface PublicationUpdateRequest {
  id: string
  title: string | null
  description: string | null
  background_color: string | null

  categories: Array<PublicationCategories> | null
}