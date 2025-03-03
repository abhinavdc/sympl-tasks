import { create } from "zustand";
import { Task } from "./types";
import { persist } from "zustand/middleware";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  clearTasks: () => void;
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
    }),
    {
      name: "task-store",
    }
  )
);
