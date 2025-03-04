import { create } from "zustand";
import { CustomFieldDefinition, Task } from "./types";
import { persist } from "zustand/middleware";

interface TaskStore {
  tasks: Task[];
  loadBulkTask: (task: Task[]) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  clearTasks: () => void;
  customFieldDefinitions: CustomFieldDefinition[];
  setCustomFieldDefinitions: (data: CustomFieldDefinition[]) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      loadBulkTask: (tasks) => {
        set({ tasks: [...tasks] });
      },

      addTask: (task) => {
        const newTask: Task = { id: Date.now(), ...task };
        set({ tasks: [...get().tasks, newTask] });
      },

      updateTask: (id, updatedTask) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        });
      },

      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((task) => task.id !== id) });
      },

      clearTasks: () => {
        set({ tasks: [] });
      },

      customFieldDefinitions: [],
      setCustomFieldDefinitions: (fields: CustomFieldDefinition[]) => {
        set({ customFieldDefinitions: fields });
      },
    }),
    {
      name: "task-store",
    }
  )
);
