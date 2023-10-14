'use client';

import React, { useEffect, useState } from 'react';
import useTask from '@/store/useTask';

const Task = () => {
  useEffect(() => {
    useTask.persist.rehydrate();
  }, []);

  const [task, setTask] = useState<string>('');
  const tasks = useTask(state => state.tasks);
  const addTask = useTask(state => state.addTask);
  const toggleCompleted = useTask(state => state.toggleCompleted);
  const removeTask = useTask(state => state.removeTask);

  const handleAddTask = () => {
    addTask(task);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <input
        type="text"
        placeholder="Add a task for this round..."
        value={task}
        onChange={e => setTask(e.target.value)}
        className="border"
      />
      <div onClick={handleAddTask}>Add</div>
      <ul>
        {tasks.map(task => (
          <>
            <li key={task.id} className="flex flex-row justify-between gap-x-2">
              <button onClick={() => toggleCompleted(task.id)}>
                {task.completed ? 'completed' : 'not completed'}
              </button>
              <h1>{task.task}</h1>
              <button onClick={() => removeTask(task.id)}>remove</button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Task;
