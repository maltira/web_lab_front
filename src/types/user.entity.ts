import type { GroupEntity } from '@/types/group.entity.ts'

export interface UserEntity {
  id: string
  name: string
  description: string | null
  avatar: string | null
  is_greeting_closed: boolean
  email: string
  password: string
  group_id: string
  is_block: boolean

  last_visit_at: Date
  created_at: Date
  updated_at: Date

  Group: GroupEntity
}
export interface CreateUserRequest {
  name: string
  email: string
  password: string
}
export interface UpdatedUser {
  id: string
  name?: string
  description?: string | null
  avatar?: string | null
  is_greeting_closed?: boolean | null
  email?: string
  is_block?: boolean
  group_id?: string
  last_visit_time?: Date
}
export interface UpdatedGreeting {
  id: string
  is_greeting_closed: boolean
}