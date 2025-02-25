import type { App, Plugin } from 'vue'
import 'virtual:uno.css'
import '@/assets/main.css'

// Import components
import AiConfigForm from './components/AiConfigForm.vue'
import Card from './components/Card.vue'
import DeepSeek from '@/components/icon/DeepSeek.vue'
import Gemini from '@/components/icon/Gemini.vue'
import Qwen from '@/components/icon/Qwen.vue'
import TencentCloud from '@/components/icon/TencentCloud.vue'
import OpenAI from '@/components/icon/OpenAI.vue'
import Spark from '@/components/icon/Spark.vue'

export * from '@/ai'
export * from '@/store/useAiConfigStore'
export * from '@/composition/useAiChat'

// Register components globally
const AiComponentPlugin: Plugin = {
  install(app: App) {
    app.component('AiConfigForm', AiConfigForm)
    app.component('DeepSeek', DeepSeek)
    app.component('Gemini', Gemini)
    app.component('Qwen', Qwen)
    app.component('TencentCloud', TencentCloud)
    app.component('OpenAI', OpenAI)
    app.component('Spark', Spark)
  },
}

// Export components for individual usage
export {
  AiConfigForm,
  Card,
}

// Export the Vue plugin
export default AiComponentPlugin
