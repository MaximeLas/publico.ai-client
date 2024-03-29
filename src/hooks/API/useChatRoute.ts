import { useCallback } from "react";
import { ApiRoute } from "../../enums/API";
import { ChatRequest } from "../../types/API";

export interface UseChatRouteOptions {
  onNewToken: (token: string) => void;
  onStreamEnd: () => void;
}

function useChatRoute({ onNewToken, onStreamEnd }: UseChatRouteOptions) {
  return useCallback(
    async (
      body: ChatRequest,
      hostName = "http://127.0.0.1:8000",
      path: string = ApiRoute.Chat
    ) => {
      const response = await fetch(`${hostName}/${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      // Here we start prepping for the streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;

      while (loopRunner) {
        // Here we start reading the stream, until its done.
        const { value, done } = await reader.read();
        if (done) {
          onStreamEnd();
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        onNewToken(decodedChunk);
      }
    },
    [onNewToken, onStreamEnd]
  );
}

export default useChatRoute;
