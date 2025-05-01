import { create } from "zustand";
import { IAgent } from "@/sections/home/agent/type";
import { AgentInfo } from "@/sections/home/chat/types";

interface AgentState {
  selectedAgent: AgentInfo | null;
  selectAgent: (agent: IAgent) => void;
  clearSelectedAgent: () => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  selectedAgent: null,
  selectAgent: (agent: IAgent) =>
    set({
      selectedAgent: {
        title: agent.title,
        slug: agent.slug,
        description: agent.description,
      },
    }),
  clearSelectedAgent: () => set({ selectedAgent: null }),
}));
