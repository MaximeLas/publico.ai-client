import IDBClient from "./IDBClient";
import ChatSession from "./Models/Chat/ChatSession";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  limit,
  QueryConstraint,
  orderBy,
  updateDoc,
  arrayUnion,
  CollectionReference,
  FieldValue,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { ImplicitQuestion } from "./Abstractions";
import MessageData from "./Models/Chat/MessageData";

const CHAT_SESSIONS_COLLECTION = "chat_sessions";

function getSessionDocRef(sessionId: string) {
  return doc(
    collection(firestore, CHAT_SESSIONS_COLLECTION) as CollectionReference<
      ChatSession,
      ChatSession
    >,
    sessionId
  );
}

type FieldValueMapped<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | FieldValue;
};

const DBClient: IDBClient = {
  createNewSession({ id, ...session }: ChatSession): Promise<void> {
    const collectionRef = collection(firestore, CHAT_SESSIONS_COLLECTION);
    const docRef = doc(collectionRef, id);
    return setDoc(docRef, session);
  },
  async getUserChatSessions(
    userId: string,
    queryOrderBy?:
      | keyof ChatSession
      | [property: keyof ChatSession, descending: boolean]
      | null
      | undefined,
    queryLimit?: number | undefined
  ): Promise<ChatSession[]> {
    const collectionRef = collection(firestore, CHAT_SESSIONS_COLLECTION);
    const constraints: QueryConstraint[] = [where("userId", "==", userId)];
    if (queryOrderBy) {
      if (Array.isArray(queryOrderBy)) {
        const [property, descending] = queryOrderBy;
        constraints.push(orderBy(property, descending ? "desc" : "asc"));
      } else {
        constraints.push(orderBy(queryOrderBy));
      }
    }
    if (queryLimit) constraints.push(limit(queryLimit));
    const q = query(collectionRef, ...constraints);
    const res = await getDocs(q);
    const sessions: ChatSession[] = [];
    res.forEach((doc) => {
      if (doc.exists()) {
        sessions.push({ ...doc.data(), id: doc.id } as ChatSession);
      }
    });
    return sessions;
  },
  async getLastUserChatSession(userId: string): Promise<ChatSession | null> {
    if (!userId) return null;
    const collectionRef = collection(firestore, CHAT_SESSIONS_COLLECTION);
    const q = query(
      collectionRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const res = await getDocs(q);
    let session: ChatSession | null = null;
    for (const doc of res.docs) {
      if (doc.exists()) {
        session = { ...doc.data(), id: doc.id } as ChatSession;
        break;
      }
    }
    return session;
  },
  async updateSessionChatData(session: ChatSession): Promise<void> {
    if (!session.id) throw new Error("Session ID is required");
    const docRef = getSessionDocRef(session.id);
    await updateDoc(docRef, {
      messages: arrayUnion(...session.messages),
      currentControls: session.currentControls,
      implicitQuestions: arrayUnion(...session.implicitQuestions),
    });
  },
  async updateSessionMessages(sessionId: string, messages: MessageData[]) {
    const docRef = getSessionDocRef(sessionId);
    await updateDoc(docRef, {
      messages: arrayUnion(...messages),
    });
  },
  async updateSessionImplicitQuestions(
    sessionId: string,
    implicitQuestions: ImplicitQuestion[]
  ) {
    if (!sessionId) throw new Error("Session ID is required");
    const docRef = getSessionDocRef(sessionId);
    await updateDoc(docRef, {
      implicitQuestions: arrayUnion(...implicitQuestions),
    });
  },
  async updateSession(
    sessionId: string,
    session: Partial<ChatSession>
  ): Promise<void> {
    const docRef = getSessionDocRef(sessionId);
    const merged: FieldValueMapped<Partial<ChatSession>> = { ...session };
    if (session.messages) {
      merged.messages = arrayUnion(...session.messages);
    }
    if (session.implicitQuestions) {
      const questions = (await getDoc(docRef)).data()?.implicitQuestions;
      if(questions){
        merged.implicitQuestions = [];
        for(const question of session.implicitQuestions){
          const existingIndex = questions.findIndex((q: ImplicitQuestion) => q.index === question.index);
          if(existingIndex !== -1){
            questions[existingIndex] = question;
          } else {
            questions.push(question);
          }
        }
        merged.implicitQuestions = questions;
      }
    }
    await updateDoc(docRef, merged);
  },
};

export default DBClient;
