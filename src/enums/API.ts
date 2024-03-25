export enum ApiRoute {
  NewSession = "new_session",
  Chat = "chat",
  AfterChat = "after_chat",
  EditAnswer = "edit",
}

export enum InputType {
  Chatbot = 1,
  Button,
  NumberInput,
}

export enum ChatControl {
  CHATBOT =  1,
  START, // I'm ready!
  YES,
  NO,
  FILES,
  WORD_LIMIT,
  GOOD_AS_IS, // Good as is!
  EDIT_IT, // Let me edit it
  ADD_GUIDANCE, // Let me add some guidance
  OF_COURSE, // Of course I'm ready!
  NUM_OF_TOKENS,
  NUM_OF_DOCS,
}
