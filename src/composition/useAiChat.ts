import type { ChatCompletion, ChatCompletionMessageParam } from 'openai/src/resources/chat/completions'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { AiChatRepository } from '@/ai'
import type { AiChat, AiChatMessage, AiChatRole } from '@/ai'
import { AiChatApi } from '@/ai/AiChatApi'

export interface UseChatOptions {
  name: string
  id: string
  prompt?: string
  onLoad?: () => void
}

export interface UseChatReturn {
  chat: Ref<AiChat | undefined>
  messages: Ref<AiChatMessage[]>
  latestMessageContent: Ref<string>
  latestResponseContent: Ref<string>
  saveMessage: (msg: string, role: AiChatRole, id?: string) => Promise<void>
  updateChat: (options: UseChatOptions) => Promise<void>
  streaming: Ref<boolean>
  sending: Ref<boolean>
  send: (message: string, clearHistory?: boolean) => Promise<void>
  clear: () => Promise<void>
  sendWithStream: (message: string, clearHistory?: boolean, onSent?: () => void) => Promise<void>
}
export function useAiChat(options: UseChatOptions): UseChatReturn {
  const chat = ref<AiChat>()
  const messages = ref<AiChatMessage[]>([])
  const latestMessageContent = ref<string>('')
  const latestResponseContent = ref<string>('')
  const streaming = ref(false)
  const sending = ref(false)

  onMounted(async () => {
    updateChat(options)
  })

  async function updateChat(newOptions: Omit<UseChatOptions, 'onLoad'>) {
    const { id: chatId, name, prompt } = newOptions
    let dbChat = await AiChatRepository.getChat(chatId)
    if (!dbChat) {
      dbChat = {
        id: chatId,
        name,
        icon: '🤖',
        prompt,
      }
      await AiChatRepository.saveChat(dbChat)
    }
    dbChat.prompt = prompt
    chat.value = dbChat
    messages.value = await AiChatRepository.getMessages(chatId)
    latestMessageContent.value = messages.value[messages.value.length - 1]?.content || ''
    latestResponseContent.value = messages.value.findLast(it => it.role !== 'user')?.content ?? ''
    options.onLoad?.()
  }

  function newMessage(message: string, role: AiChatRole, id?: string): AiChatMessage {
    const timestamp = Date.now()
    return {
      id: id ?? timestamp.toString(),
      chatId: chat.value!.id,
      content: message,
      role,
      timestamp,
    }
  }

  async function saveMessage(msg: string, role: AiChatRole, id?: string) {
    const message = newMessage(msg, role, id)
    await AiChatRepository.saveMessage(message)
    messages.value.push(message)
    latestMessageContent.value = message.content
    if (role !== 'user') {
      latestResponseContent.value = message.content
    }
  }

  async function prepareMessages(message: string): Promise<ChatCompletionMessageParam[]> {
    await saveMessage(message, 'user')

    const aiMessages: Array<ChatCompletionMessageParam> = []
    aiMessages.push({
      content: chat.value?.prompt || '',
      role: 'system',
    })

    const arr = messages.value.map((message) => {
      const param: ChatCompletionMessageParam = {
        content: message.content,
        role: message.role,
        name: '',
      }
      return param
    })
    aiMessages.push(...arr)
    return aiMessages
  }

  async function saveCompletionMessage(completion: ChatCompletion) {
    await saveMessage(completion.choices[0]?.message?.content || '', 'assistant', completion.id)
  }

  async function clear() {
    messages.value = []
    await AiChatRepository.deleteMessages(chat.value!.id)
  }

  async function sendWithStream(message: string, clearHistory: boolean = false, onSent?: () => void) {
    if (streaming.value || sending.value) {
      return
    }
    sending.value = true
    try {
      if (clearHistory) {
        await clear()
      }
      const aiMessages = await prepareMessages(message)
      streaming.value = true
      latestMessageContent.value = ''
      latestResponseContent.value = ''
      const result = await AiChatApi.steam(aiMessages, (chunk: string) => {
        latestMessageContent.value = latestMessageContent.value + chunk
        latestResponseContent.value = latestResponseContent.value + chunk
      }, () => {
        sending.value = false
        onSent?.()
      })
      await saveCompletionMessage(result)
    }
    catch (e) {
      console.error(e)
      saveMessage(e.message, 'system')
    }
    finally {
      streaming.value = false
    }
  }

  async function send(message: string, clearHistory: boolean = false) {
    if (sending.value) {
      return
    }
    try {
      if (clearHistory) {
        await clear()
      }
      const aiMessages = await prepareMessages(message)
      sending.value = true
      const result = await AiChatApi.completionsCreate(aiMessages)
      await saveCompletionMessage(result)
    }
    catch (e) {
      console.error(e)
      saveMessage(e.message, 'system')
    }
    finally {
      sending.value = false
    }
  }

  return {
    chat,
    messages,
    latestMessageContent,
    latestResponseContent,
    saveMessage,
    updateChat,
    streaming,
    sending,
    send,
    clear,
    sendWithStream,
  }
}
