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
  const removeTask = useTask(state => state.removeTask);

  const handleAddTask = () => {
    addTask(task);
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Add a task for this round..."
        value={task}
        onChange={e => setTask(e.target.value)}
      />
      <div onClick={handleAddTask}>Add</div>
      <ul>
        {tasks.map(task => (
          <>
            <li key={task.id} className="flex flex-col">
              <h1>{task.task}</h1>
              <button onClick={() => removeTask(task.id)}>remove</button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

// const Task = () => {
//   const [tasks, setTasks] = useState<string[]>([]);
//   const [task, setTask] = useState<string>('');

//   const handleAddTask = () => {
//     setTasks([...tasks, task]);
//   };

//   return (
//     <div className="flex flex-col">
//       <input
//         type="text"
//         placeholder="Add a task for this round..."
//         value={task}
//         onChange={e => setTask(e.target.value)}
//       />
//       <div onClick={handleAddTask}>Add</div>
//       {tasks.map(task => (
//         <>
//           <h1>{task}</h1>
//         </>
//       ))}
//     </div>
//   );
// };

export default Task;
