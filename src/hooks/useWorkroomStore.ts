import { create } from "zustand";
import { IWorkroom } from "@/sections/home/workroom/type";
import { AgentInfo } from "@/sections/home/chat/types";

interface WorkroomInfo {
  title: string;
  slug: string;
  description?: string;
}

interface WorkroomState {
  selectedWorkroom: WorkroomInfo | null;
  selectWorkroom: (workroom: IWorkroom) => void;
  clearSelectedWorkroom: () => void;
}

export const useWorkroomStore = create<WorkroomState>((set) => ({
  selectedWorkroom: null,
  selectWorkroom: (workroom: IWorkroom) =>
    set({
      selectedWorkroom: {
        title: workroom.title,
        slug: workroom.slug,
        description: workroom.description,
      },
    }),
  clearSelectedWorkroom: () => set({ selectedWorkroom: null }),
}));
