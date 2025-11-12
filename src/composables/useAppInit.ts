import { ref } from 'vue'
import { useUserStore } from '@/stores/user.store.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import type { AuthResponse } from '@/types/auth.entity.ts'

export function useAppInit() {
  const isAppReady = ref(false)
  const userStore = useUserStore()
  const authStore = useAuthStore()

  const initApp = async (): Promise<void> => {
    try {
      const auth: AuthResponse | null = await authStore.checkAuth()
      if (auth !== null && auth.user) {
        userStore.setUser(auth.user)
        authStore.isAuthenticated = true
      }
    }
    catch (error) {
      console.error("App initialization failed:", error)
    }
    finally {
      isAppReady.value = true
    }
  }
  return {
    isAppReady,
    initApp,
  }
}