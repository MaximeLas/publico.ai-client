import { ChatControl } from "../enums/API";

const ChatControlValues: {
  [key in ChatControl]: { label: string; variant?: string };
} = {
  [ChatControl.CHATBOT]: { label: "Chatbot" },
  [ChatControl.START]: { label: "I'm ready!" },
  [ChatControl.YES]: { label: "Yes" },
  [ChatControl.NO]: { label: "No", variant: "danger" },
  [ChatControl.FILES]: { label: "" },
  [ChatControl.WORD_LIMIT]: { label: "Word limit" },
  [ChatControl.GOOD_AS_IS]: { label: "Good as is!" },
  [ChatControl.EDIT_IT]: { label: "Let me edit it" },
  [ChatControl.ADD_GUIDANCE]: { label: "Let me add some guidance" },
  [ChatControl.OF_COURSE]: { label: "Of course I'm ready!" },
  [ChatControl.NUM_OF_TOKENS]: { label: "" },
  [ChatControl.NUM_OF_DOCS]: { label: "" },
};

export default ChatControlValues;
