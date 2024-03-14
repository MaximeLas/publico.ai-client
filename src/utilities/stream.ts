export async function handleStreamingTextResponse(
  response: Response,
  onNewToken?: null | ((token: string, done: boolean) => void)
): Promise<void> {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
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
      break;
    }
    const decodedChunk = decoder.decode(value, { stream: true });
    onNewToken?.(decodedChunk, done);
  }
}
