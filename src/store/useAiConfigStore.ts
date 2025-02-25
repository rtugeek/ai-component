import { useStorage, watchDebounced } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { AiChatApi } from '@/ai/AiChatApi'
import type { AiConfig } from '@/ai/AiConfig'

export const useAiConfigStore = defineStore('ai-config', () => {
  const aiConfig = useStorage<AiConfig>('ai-config', {
    apiKey: '',
    url: '',
    model: '',
  })
  const isConfigured = computed(() => {
    return aiConfig.value.apiKey !== '' && aiConfig.value.url !== '' && aiConfig.value.model !== ''
  })
  function updateConfig(config: AiConfig) {
    AiChatApi.updateConfig(config)
  }

  updateConfig(aiConfig.value)

  watchDebounced(aiConfig, (config) => {
    updateConfig(config)
  }, { debounce: 500, deep: true })
  return { aiConfig, isConfigured }
})
