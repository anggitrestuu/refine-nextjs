export type IWorkroom = {
  title: string;
  slug: string;
  description: string;
  model: string;
  prompt: string;
  agents: string;
  tools: string;
  canvases?: string;
};

export interface IWorkroomDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  model: string;
  prompt: string;
  canvases?: string;
  tools: { id: number; title: string; slug: string; description: string }[];
  agents: { id: number; title: string; slug: string; description: string }[];
}
