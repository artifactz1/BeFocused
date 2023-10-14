'use client';

// Import create from Zustand
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Task {
  id: number;
  completed: boolean;
  task: string;
}

interface Store {
  tasks: Task[];
  addTask: (task: string) => void;
  toggleCompleted: (id: number) => void;
  removeTask: (id: number) => void;
}

const useTask = persist<Store>(
  set => ({
    tasks: [],
    addTask: task =>
      set(state => ({
        tasks: [
          ...state.tasks,
          { id: state.tasks.length + 1, completed: false, task: task }
        ]
      })),
    toggleCompleted: id =>
      set(state => ({
        tasks: state.tasks.map(task => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        })
      })),
    removeTask: id =>
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }))
  }),
  {
    name: 'task-storage', // name of the item in the storage (must be unique)
    // (optional) by default, 'localStorage' is used
    // session to store for that session
    storage: createJSONStorage(() => sessionStorage),
    skipHydration: true
  }
);

export default create(useTask);
