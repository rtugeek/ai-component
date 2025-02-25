import type { Table } from 'dexie'
import Dexie from 'dexie'
import type { AiChat, AiChatMessage } from './AiChat'

class AiChatDatabase extends Dexie {
  chats!: Table<AiChat>
  messages!: Table<AiChatMessage>

  constructor() {
    super('chat-v1')

    this.version(1).stores({
      chats: 'id, name',
      messages: 'id, completionId, timestamp, role, chatId',
    })
  }
}

const db = new AiChatDatabase()

export class AiChatRepository {
  static async saveChat(chat: AiChat): Promise<AiChat> {
    await db.chats.put(chat)
    return chat
  }

  static async getChat(chatId: string): Promise<AiChat | null> {
    const chat = await db.chats.get(chatId)
    return chat || null
  }

  static async getChats(): Promise<AiChat[]> {
    return db.chats.toArray()
  }

  static async deleteChat(chatId: string): Promise<void> {
    await db.transaction('rw', db.chats, db.messages, async () => {
      await db.chats.delete(chatId)
      await db.messages.where('chatId').equals(chatId).delete()
    })
  }

  static async saveMessage(message: AiChatMessage): Promise<AiChatMessage> {
    await db.messages.put(message)
    return message
  }

  static async saveMessages(messages: AiChatMessage[]): Promise<AiChatMessage[]> {
    await db.messages.bulkPut(messages)
    return messages
  }

  static async getMessage(messageId: string): Promise<AiChatMessage | null> {
    const message = await db.messages.get(messageId)
    return message || null
  }

  static async getMessages(chatId: string): Promise<AiChatMessage[]> {
    return db.messages
      .where('chatId')
      .equals(chatId)
      .sortBy('timestamp')
  }

  static async deleteMessage(messageId: string): Promise<void> {
    await db.messages.delete(messageId)
  }

  static async deleteMessages(chatId: string): Promise<void> {
    await db.messages.where('chatId').equals(chatId).delete()
  }

  static async getLatestMessage(chatId: string): Promise<AiChatMessage | null> {
    const message = (await db.messages
      .where('chatId')
      .equals(chatId)
      .sortBy('timestamp'))
      .reverse()
    return message.length > 0 ? message[0] : null
  }

  static async getMessageCount(chatId: string): Promise<number> {
    return db.messages
      .where('chatId')
      .equals(chatId)
      .count()
  }
}
