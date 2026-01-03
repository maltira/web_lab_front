import config from '@/config'
import type {
  FavoritePublicationEntity,
  PublicationEntity,
  PublicationRequest,
  PublicationUpdateRequest,
} from '@/types/publication.entity.ts'
import type { ErrorResponse, MessageResponse } from '@/types/error.entity.ts'
import type { CategorizedGroups } from '@/types/category.entity.ts'

class PublicationService {
  private baseURL: string = config.apiUrl

  async getAllCategories(): Promise<CategorizedGroups | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/categories/all`, {
      method: 'GET',
      credentials: 'include',
    })
    return response.json()
  }

  async fetchAll(isDraft: boolean = false): Promise<PublicationEntity[] | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/all?is_draft=${isDraft}`, {
      method: 'GET',
      credentials: 'include',
    })
    return response.json()
  }

  async fetchByUserID(
    id: string,
    isDraft: boolean = false,
  ): Promise<PublicationEntity[] | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/user/${id}/all?is_draft=${isDraft}`, {
      method: 'GET',
      credentials: 'include',
    })
    return response.json()
  }

  async fetchByID(id: string): Promise<PublicationEntity | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
    return response.json()
  }

  async createPublication(req: PublicationRequest): Promise<MessageResponse | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/create`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(req),
    })
    return response.json()
  }

  async deletePublication(id: string): Promise<MessageResponse | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    return response.json()
  }

  async updatePublication(req: PublicationUpdateRequest): Promise<MessageResponse | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/update`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(req),
    })
    return response.json()
  }

  async GetAllFavByCurrentUser(): Promise<FavoritePublicationEntity[] | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/saved/all`, {
      method: 'GET',
      credentials: 'include',
    })
    return response.json()
  }
  async CheckIsFavorite(publicationID: string): Promise<boolean> {
    const response = await fetch(`${this.baseURL}/publication/saved/${publicationID}/check`, {
      method: 'GET',
      credentials: 'include',
    })
    return response.json()
  }
  async UpdateFavorite(publicationID: string, isSave: boolean): Promise<MessageResponse | ErrorResponse> {
    const response = await fetch(`${this.baseURL}/publication/saved/${publicationID}?is_save=${isSave}`, {
      method: 'POST',
      credentials: 'include',
    })
    return response.json()
  }
}

export const publicationService = new PublicationService();