export interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed?: boolean;
  priority?: "Low" | "Medium" | "High";
  created_at?: Date;
  updated_at?: Date;
}