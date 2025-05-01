import { API_URLS } from "@config-global";
import { axiosInstance } from "@providers/rest-data-provider/utils";

export interface ChatResponse {
  task_id: string;
  canvas: string[];
  branch: string;
  chat_type: string;
  slug: string;
}

export interface ChatMessage {
  message: string;
}

export interface ChatStreamResponse {
  task_id: string;
  response: string; // This is a JSON string that needs to be parsed
}

export interface StreamChunk {
  type: "chunk" | "final" | "error";
  content: string;
}

/**
 * Initiates a chat with an agent
 * @param slug The agent slug
 * @param message The message to send
 * @returns A promise that resolves to the chat response
 */
export const initiateAgentChat = async (
  slug: string,
  message: string
): Promise<ChatResponse> => {
  try {
    const response = await axiosInstance.post<ChatResponse>(
      `${API_URLS.meridianUrl}/api/chat/agents/${slug}/`,
      { message }
    );
    return response.data;
  } catch (error) {
    console.error("Error initiating chat:", error);
    throw error;
  }
};

/**
 * Initiates a chat with a workroom
 * @param slug The workroom slug
 * @param message The message to send
 * @returns A promise that resolves to the chat response
 */
export const initiateWorkroomChat = async (
  slug: string,
  message: string
): Promise<ChatResponse> => {
  try {
    const response = await axiosInstance.post<ChatResponse>(
      `${API_URLS.meridianUrl}/api/chat/workroom/${slug}/`,
      { message }
    );
    return response.data;
  } catch (error) {
    console.error("Error initiating workroom chat:", error);
    throw error;
  }
};

/**
 * Creates an EventSource to listen for chat responses
 * @param taskId The task ID returned from initiating a chat
 * @param onChunk Callback function to handle incoming message chunks
 * @param onError Callback function to handle errors
 * @param onComplete Callback function called when streaming is complete
 * @returns The EventSource instance
 */
export const createChatResponseEventSource = (
  taskId: string,
  onChunk: (chunk: StreamChunk) => void,
  onError: (error: Event) => void,
  onComplete: () => void
): EventSource => {
  const eventSource = new EventSource(
    `${API_URLS.meridianUrl}/api/chat_response/${taskId}/`,
    { withCredentials: true }
  );

  eventSource.addEventListener("message", (event) => {
    try {
      // Parse the JSON data
      const parsedData = JSON.parse(event.data) as ChatStreamResponse;

      // Parse the nested response JSON string
      if (parsedData.response && typeof parsedData.response === "string") {
        try {
          const responseObj = JSON.parse(parsedData.response);

          if (responseObj.name === "chunk") {
            // For chunk messages, send just this chunk
            onChunk({
              type: "chunk",
              content: responseObj.result,
            });
          } else if (responseObj.name === "final") {
            // For final message
            onChunk({
              type: "final",
              content: responseObj.result,
            });
            onComplete();
            eventSource.close();
          }
        } catch (e) {
          console.error("Error parsing response JSON:", e);
          // If inner JSON parsing fails, treat as direct text
          onChunk({
            type: "chunk",
            content: parsedData.response,
          });
        }
      }
    } catch (error) {
      console.error("Error parsing SSE message:", error, event.data);
      // Still try to use the data if possible
      if (event.data && typeof event.data === "string") {
        onChunk({
          type: "chunk",
          content: event.data,
        });
      } else {
        onError(new Event("parse_error"));
      }
    }
  });

  eventSource.addEventListener("error", (error) => {
    console.error("EventSource error:", error);
    onChunk({
      type: "error",
      content: "Connection error occurred",
    });
    onError(error);
    eventSource.close();
  });

  return eventSource;
};
