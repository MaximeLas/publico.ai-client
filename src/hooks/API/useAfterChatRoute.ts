import { useCallback } from "react";
import { ApiRoute } from "../../enums/API";
import { AfterChatRequest, AfterChatResponse } from "../../types/API";

export interface UseAfterChatRouteOptions {}

function useAfterChatRoute(_?: UseAfterChatRouteOptions) {
  return useCallback(
    async (
      body: AfterChatRequest,
      hostName = "http://127.0.0.1:8000",
      path: string = ApiRoute.AfterChat
    ) => {
      const response = await fetch(`${hostName}/${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw response.statusText;
      }
      return response.json() as Promise<AfterChatResponse>;
    },
    []
  );
}

export default useAfterChatRoute;
