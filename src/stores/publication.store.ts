import { defineStore } from 'pinia'
import type {
  FavoritePublicationEntity,
  PublicationEntity,
  PublicationRequest,
  PublicationUpdateRequest
} from '@/types/publication.entity.ts'
import type { ErrorResponse, MessageResponse } from '@/types/error.entity.ts'
import { publicationService } from '@/api/publication.service.ts'
import { isErrorResponse } from '@/utils/response_type.ts'
import type { CategorizedGroups, PublicationCategoriesRequest } from '@/types/category.entity.ts'

export type filterType = {
  date: null | 'month' | 'six months',
  categories: PublicationCategoriesRequest[]
}

export const usePublicationStore = defineStore('publication', {
  state: () => ({
    publications: [] as PublicationEntity[],
    isLoading: false,
    error: null as string | null,
    searchPublicationQuery: null as string | null,
    filter: {
      date: null as filterType['date'],
      categories: [] as filterType['categories'],
    },
  }),

  getters: {
    allPublications: (state) => {
      if (!state.searchPublicationQuery) {
        return [...state.publications].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      }

      const query = state.searchPublicationQuery.toLowerCase()
      return state.publications.filter(
        (pub) => pub.title.toLowerCase().includes(query) || pub.description.toLowerCase().includes(query),
      )
    },
  },

  actions: {
    setSearchQuery(query: string) {
      this.searchPublicationQuery = query
    },

    async fetchPublication(id: string): Promise<PublicationEntity | null> {
      try {
        this.isLoading = true
        this.error = null

        const response: PublicationEntity | ErrorResponse = await publicationService.fetchByID(id)

        if (isErrorResponse(response)) {
          this.error = response.error
          return null
        }

        return response
      } catch {
        this.error = 'Ошибка получения публикации, повторите попытку'
        return null
      } finally {
        this.isLoading = false
      }
    },

    async getAllCategories(): Promise<CategorizedGroups | null> {
      try {
        this.isLoading = true
        this.error = null

        const response: CategorizedGroups | ErrorResponse = await publicationService.getAllCategories()
        if (isErrorResponse(response)) {
          this.error = response.error
          return null
        }

        return response
      } catch {
        this.error = 'Ошибка получения категорий, повторите попытку'
        return null
      } finally {
        this.isLoading = false
      }
    },
    async fetchAllPublications(is_draft: boolean = false): Promise<PublicationEntity[] | null> {
      try {
        this.isLoading = true
        this.error = null

        const response: PublicationEntity[] | ErrorResponse = await publicationService.fetchAll(is_draft)

        if (isErrorResponse(response)) {
          this.error = response.error
          return null
        }

        this.publications = response
        return response
      } catch {
        this.error = 'Ошибка получения публикаций, повторите попытку'
        return null
      } finally {
        this.isLoading = false
      }
    },
    async fetchPublicationsByUserID(id: string, is_draft: boolean = false): Promise<PublicationEntity[] | null> {
      try {
        this.isLoading = true
        this.error = null

        const response: PublicationEntity[] | ErrorResponse = await publicationService.fetchByUserID(id, is_draft)
        if (isErrorResponse(response)) {
          this.error = response.error
          return null
        }

        return response
      } catch {
        this.error = 'Ошибка получения публикаций, повторите попытку'
        return null
      } finally {
        this.isLoading = false
      }
    },

    async createPublication(req: PublicationRequest): Promise<boolean | null> {
      try {
        this.isLoading = true
        this.error = null

        const response: MessageResponse | ErrorResponse = await publicationService.createPublication(req)

        if (isErrorResponse(response)) {
          this.error = response.error
          return null
        }

        await this.fetchAllPublications()

        return true
      } catch {
        this.error = 'Ошибка созданий публикации, повторите попытку'
        return null
      } finally {
        this.isLoading = false
      }
    },

    async deletePublication(id: string): Promise<boolean | null> {
      try {
        this.isLoading = true
        this.error = null

        const response: MessageResponse | ErrorResponse = await publicationService.deletePublication(id)
        console.log(response)
        if (isErrorResponse(response)) {
          this.error = response.error
          return null
        }

        await this.fetchAllPublications()

        return true
      } catch {
        this.error = 'Ошибка удаления публикации, повторите попытку'
        return null
      } finally {
        this.isLoading = false
      }
    },

    async updatePublication(req: PublicationUpdateRequest): Promise<boolean | null> {
      try {
        this.isLoading = true
        this.error = null

        const response: MessageResponse | ErrorResponse = await publicationService.updatePublication(req)

        if (isErrorResponse(response)) {
          this.error = response.error
          return null
        }

        await this.fetchAllPublications()

        return true
      } catch {
        this.error = 'Ошибка изменения публикации, повторите попытку'
        return null
      } finally {
        this.isLoading = false
      }
    },

    async getAllFavorites(): Promise<FavoritePublicationEntity[]> {
      try {
        this.isLoading = true
        this.error = null

        const response: FavoritePublicationEntity[] | ErrorResponse = await publicationService.GetAllFavByCurrentUser()
        if (isErrorResponse(response)) {
          this.error = response.error
          return []
        }

        return response
      } catch {
        this.error = 'Ошибка получения избранного, повторите попытку'
        return []
      } finally {
        this.isLoading = false
      }
    },
    async checkFavorite(publicationID: string): Promise<boolean> {
      try {
        this.isLoading = true
        this.error = null
        return await publicationService.CheckIsFavorite(publicationID)
      } catch {
        this.error = 'Ошибка информации об избранном, повторите попытку'
        return false
      } finally {
        this.isLoading = false
      }
    },
    async UpdateFavorite(publicationID: string, isSave: boolean): Promise<void> {
      try {
        this.isLoading = true
        this.error = null

        const response: MessageResponse | ErrorResponse = await publicationService.UpdateFavorite(publicationID, isSave)
        if (isErrorResponse(response)) {
          this.error = response.error
        }
      } catch {
        this.error = 'Ошибка действия над сохраненной публикацией, повторите попытку'
      } finally {
        this.isLoading = false
      }
    },
  },
})