import { create } from "zustand";
import { CustomFieldDefinition, Task } from "./types";
import { persist } from "zustand/middleware";

interface TaskStore {
  tasks: Task[];
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

      customFieldDefinitions: [
        {
          key: "estimatedTime",
          label: "Estimated Time (hrs)",
          type: "number",
          required: true,
        },
        { key: "isUrgent", label: "Urgent?", type: "checkbox", required: true },
        { key: "notes", label: "Notes", type: "text", required: true },
      ],
      setCustomFieldDefinitions: (fields: CustomFieldDefinition[]) => {
        set({ customFieldDefinitions: fields });
      },
    }),
    {
      name: "task-store",
    }
  )
);
