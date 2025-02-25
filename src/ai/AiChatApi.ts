import type { APIPromise } from 'openai/core'
import type {
  ChatCompletion,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
} from 'openai/src/resources/chat/completions'
import consola from 'consola'
import { ElNotification } from 'element-plus'
import OpenAI, { APIError } from 'openai'
import type { AiConfig } from '@/ai/AiConfig'

export class AiChatApi {
  private static aiConfig: AiConfig = {
    apiKey: '',
    url: '',
    model: 'deepseek-chat',
  }

  private static openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    baseURL: 'https://api.deepseek.com',
    apiKey: '',
  })

  static updateConfig(config: AiConfig) {
    consola.info('updateConfig', config)
    this.aiConfig = config
    this.openai = new OpenAI({
      baseURL: config.url,
      apiKey: config.apiKey,
      dangerouslyAllowBrowser: true,
    })
    this.aiConfig.model = config.model
  }

  private static handleApiError(e: unknown) {
    if (e instanceof APIError) {
      if (e.message.includes('Insufficient Balance')) {
        ElNotification({
          title: '错误',
          type: 'error',
          position: 'bottom-right',
          message: 'API余额不足，请到对应平台充值',
        })
      }
      else {
        ElNotification({
          title: '错误',
          type: 'error',
          message: e.message,
        })
      }
    }
    else if (e instanceof Error) {
      if (e.message.includes('Invalid URL')) {
        ElNotification({
          title: '错误',
          type: 'error',
          position: 'bottom-right',
          message: '请检查API 请求地址是否正确',
        })
      }
      else {
        ElNotification({
          title: '错误',
          type: 'error',
          position: 'bottom-right',
          message: e.message,
        })
      }
    }
  }

  static async steam(messages: Array<ChatCompletionMessageParam>, onChunk: (chunk: string) => void, onSent: () => void): Promise<ChatCompletion> {
    try {
      const stream = await this.openai.beta.chat.completions.stream({
        model: this.aiConfig.model,
        messages,
        stream: true,
      })
      onSent()
      for await (const chunk of stream) {
        onChunk(chunk.choices[0]?.delta?.content || '')
      }

      return await stream.finalChatCompletion()
    }
    catch (e) {
      this.handleApiError(e)
      throw e
    }
  }

  static async completionsCreate(body: ChatCompletionCreateParamsNonStreaming, options?: Core.RequestOptions): APIPromise<ChatCompletion> {
    try {
      return await this.openai.chat.completions.create({
        ...body,
        temperature: this.aiConfig.temperature,
        max_tokens: this.aiConfig.maxTokens ?? 8192,
        model: this.aiConfig.model,
      }, options)
    }
    catch (e) {
      this.handleApiError(e)
      throw e
    }
  }
}
