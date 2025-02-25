export interface AiChat {
  id: string
  name: string
  icon: string
  prompt?: string
}

export type AiChatRole = 'user' | 'assistant' | 'system' | 'tool' | 'developer'

export interface AiChatMessage {
  id: string
  chatId: string
  completionId?: string
  content: string
  role: AiChatRole
  timestamp: number
}
