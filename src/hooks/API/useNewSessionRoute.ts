import { useCallback, useState } from "react";
import { ApiRoute } from "../../enums/API";
import { NewSessionResponse } from "../../types/API";

export interface useNewSessionRouteOptions {}

function useNewSessionRoute(_?: useNewSessionRouteOptions) {
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  return useCallback(
    async (
      hostName = "http://127.0.0.1:8000",
      path: string = ApiRoute.NewSession
    ) => {
      if (abortController) {
        abortController.abort();
      }
      const controller = new AbortController();
      setAbortController(controller);
      const response = await fetch(`${hostName}/${path}`, {
        method: "POST",
        signal: controller.signal,
      });
      if (!response.ok) {
        throw response.statusText;
      }
      return response.json() as Promise<NewSessionResponse>;
    },
    [abortController]
  );
}

export default useNewSessionRoute;
