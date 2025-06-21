export interface PromptObjectType {
  id: string;
  userId: string;
  category: string;
  responseText: string;
  aiGenerated: boolean;
  status: string;
  promptType?: string;
  createdAt: string;
  updatedAt?: string;
  evaluation?: any;
}
