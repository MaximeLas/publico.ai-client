import ChatSession from "./Models/Chat/ChatSession";

export default interface IDBClient {
  createNewSession(session: ChatSession): Promise<void>;
  getUserChatSessions(
    userId: string,
    orderBy?:
      | null
      | keyof ChatSession
      | [property: keyof ChatSession, descending: boolean],
    limit?: number
  ): Promise<ChatSession[]>;
  getLastUserChatSession(userId: string): Promise<ChatSession | null>;
  updateSession(sessionId: string, session: Partial<ChatSession>): Promise<void>;
  updateSessionChatData(session: ChatSession): Promise<void>;
  updateSessionMessages(sessionId: string, messages: ChatSession["messages"]): Promise<void>;
  updateSessionQuestions(sessionId: string, questions: ChatSession["questions"]): Promise<void>;
  deleteSession(sessionId: string): Promise<void>;
}
