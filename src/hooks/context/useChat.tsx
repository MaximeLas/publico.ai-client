import { useContext } from "react";
import chatContext from "../../context/Chat";

export default function useChat() {
  return useContext(chatContext);
}
