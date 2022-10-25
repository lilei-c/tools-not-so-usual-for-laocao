import { defineStore, storeToRefs, acceptHMRUpdate } from 'pinia'

export const store = defineStore('formTest', {
  state: () => {
    return {
      testInput: '1',
    }
  },
})

export const storeRefs = () => storeToRefs(store())

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
