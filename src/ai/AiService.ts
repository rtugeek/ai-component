import type { Component } from 'vue-demi'
import DeepSeek from '@/components/icon/DeepSeek.vue'
import Qwen from '@/components/icon/Qwen.vue'
import Spark from '@/components/icon/Spark.vue'
import TencentCloud from '@/components/icon/TencentCloud.vue'
import OpenAI from '@/components/icon/OpenAI.vue'

export interface AiService {
  name: string
  url: string
  value: string
  apiUrl: string
  logo: Component
  chatModel: string
}

export const aiServiceList: AiService[] = [{
  name: 'DeepSeek',
  value: 'deepseek',
  url: 'https://platform.deepseek.com/usage',
  apiUrl: 'https://api.deepseek.com',
  logo: DeepSeek,
  chatModel: 'deepseek-chat',
}, {
  name: '通义千问',
  value: 'qwen',
  url: 'https://help.aliyun.com/zh/model-studio/getting-started/first-api-call-to-qwen',
  logo: Qwen,
  apiUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  chatModel: 'qwen-plus',
}, {
  name: '讯飞星火',
  url: 'https://xinghuo.xfyun.cn/sparkapi',
  logo: Spark,
  value: 'spark',
  apiUrl: 'https://spark-api-open.xf-yun.com/v1/chat/completions',
  chatModel: 'generalv3.5',
}, {
  name: '腾讯云',
  value: 'tencent-cloud',
  url: 'https://cloud.tencent.com/document/product/1772/115970',
  logo: TencentCloud,
  apiUrl: 'https://api.lkeap.cloud.tencent.com/v1',
  chatModel: 'deepseek-r1',
}, {
  name: 'OpenAI',
  value: 'openai',
  url: 'https://platform.openai.com/docs/quickstart',
  logo: OpenAI,
  apiUrl: 'https://api.openai.com/v1/',
  chatModel: 'GPT-4o',
}]
