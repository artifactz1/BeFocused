'use client';

// Import create from Zustand
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Task {
  id: number;
  task: string;
}

interface Store {
  tasks: Task[];
  addTask: (task: string) => void;
  removeTask: (id: number) => void;
}

const useTask = persist<Store>(
  set => ({
    tasks: [],
    addTask: task =>
      set(state => ({
        tasks: [...state.tasks, { id: Math.random() * 100, task: task }]
      })),
    removeTask: id =>
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }))
  }),
  {
    name: 'task-storage', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    skipHydration: true
  }
);

export default create(useTask);
