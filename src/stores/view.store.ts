import { defineStore } from 'pinia'

type PubViewMode = 'single' | 'multi'

export const usePubViewStore = defineStore('pub-view', {
  state: () => ({
    viewMode: 'multi' as PubViewMode,
  }),
  actions: {
    toggleView(viewMode: PubViewMode) {
      this.viewMode = viewMode
      localStorage.setItem('viewMode', viewMode)
    },

    initializeView() {
      const savedMode = localStorage.getItem('viewMode')
      if (savedMode && (savedMode === 'single' || savedMode === 'multi')) {
        this.toggleView(savedMode)
      } else this.toggleView('multi')
    }
  }
})

