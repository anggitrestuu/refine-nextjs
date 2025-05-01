export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface AgentInfo {
  title: string;
  slug: string;
  description?: string;
}
