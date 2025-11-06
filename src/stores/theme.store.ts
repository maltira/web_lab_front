import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light' as 'light' | 'dark' | 'auto',
  }),
  actions: {
    applyTheme() {
      let effectiveTheme = this.theme

      if (this.theme === 'auto') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      if (effectiveTheme === 'dark') {
        document.documentElement.classList.add('dark-theme')
      } else {
        document.documentElement.classList.remove('dark-theme')
      }

      localStorage.setItem('theme', this.theme)
    },

    initializeTheme() {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null
      this.theme = savedTheme || 'light'
      this.applyTheme()
    },

    toggleTheme(theme: 'light' | 'dark') {
      this.theme = theme
      this.applyTheme()
    }
  }
})