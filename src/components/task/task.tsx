'use client';

import React, { useEffect, useState } from 'react';
import useTask from '@/store/useTask';
import { AnimatePresence, motion } from 'framer-motion';
import { ModeToggle } from '../mode-toggle';

// .line-through-animation {
//     position: absolute;
//     left: 0;
//     top: 50%;
//     width: 100%;
//     height: 1px; /* Adjust the line height as needed */
//     background-color: gray; /* Adjust the line color as needed */
//   }

const lineThroughAnimationStyle = {
  position: 'absolute',
  left: 0,
  top: '50%',
  width: '100%',
  height: '1px', // Adjust the line height as needed
  backgroundColor: 'gray' // Adjust the line color as needed
};

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
    if (task.length !== 0) {
      addTask(task);
      setTask('');
    }
  };

  const handleRemoveTask = (id: number) => {
    removeTask(id);
  };

  const date = new Date(); // Create a Date object for the current date
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const dayNumber = date.getDate();
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen md:w-full">
      <ModeToggle />
      <div className="p-10">
        <div className="flex flex-row items-center justify-between mb-10">
          <section className="flex flex-row items-center space-x-1">
            <h1 className="text-4xl">{dayNumber}</h1>
            <div className="flex flex-col text-sm text-gray-600">
              <span className="font-bold text-black">{monthName}</span>
              {year}
            </div>
          </section>

          <h1 className="font-bold">{dayName}</h1>
        </div>

        <ul className="mb-10 h-[150px] overflow-auto">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <li className="flex flex-row justify-between gap-x-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="text-indigo-600 h-5 w-5"
                      checked={task.completed}
                      onChange={() => toggleCompleted(task.id)}
                    />

                    <motion.span className="text-gray-700">
                      {task.task}
                      {task.completed && (
                        <motion.div
                          className=""
                          //   style={{
                          //     position: "absolute",
                          //     left: 0,
                          //     top: "50%",
                          //     width: "100%",
                          //     height: "1px", // Adjust the line height as needed
                          //     backgroundColor: "gray", // Adjust the line color as needed
                          //   }}

                          style={{
                            position: 'relative',
                            bottom: '11px',
                            // marginBottom: "5", // Adjust this value as needed
                            marginTop: '5', // Adjust this value as needed
                            // width: "100%",

                            height: '1px', // Adjust the line height as needed
                            backgroundColor: 'gray' // Adjust the line color as needed
                          }}
                          //   initial={{ width: 0 }}
                          //   animate={{ width: "100%" }}
                          //   transition={{ duration: 0.5 }}
                          initial={{ width: task.completed ? '0%' : '100%' }}
                          animate={{ width: task.completed ? '100%' : '0%' }}
                          transition={{ duration: 1 }}
                        />
                      )}
                    </motion.span>

                    {/* <input
                      type="checkbox"
                      className="text-indigo-600 h-5 w-5"
                      checked={task.completed}
                      onChange={() => toggleCompleted(task.id)}
                    />

                    <span
                      className={
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-700"
                      }
                    >
                      {task.task}
                    </span>

                    <motion.span
                      className={
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-700"
                      }
                      initial={task.completed ? { width: 0 } : {}}
                      animate={task.completed ? { width: "100%" } : {}}
                      transition={{ duration: 0.5 }}
                    ></motion.span> */}
                  </label>
                  <button onClick={() => handleRemoveTask(task.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </li>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <section className="border rounded-md p-2 flex flex-row space-x-5">
          <button className="flex flex-row" onClick={handleAddTask}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Add a task ..."
            value={task}
            className="outline-none"
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddTask();
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default Task;
