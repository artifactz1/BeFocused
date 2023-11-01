'use client';

import React, { useEffect, useState } from 'react';
import useTask from '@/store/useTask';
import { AnimatePresence, motion } from 'framer-motion';
import { ModeToggle } from '../mode-toggle';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { dayName, dayNumber, monthName, year } from '@/utils/calender';
import { Task } from '@/store/useTask';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';

interface TaskListProps {
  tasks: Task[];
  toggleCompleted: (id: number) => void;
  handleRemoveTask: (id: number) => void;
}

interface TaskListInputProps {
  task: string;
  setTask: (value: string) => void;
  handleAddTask: () => void;
}

function TaskTitle() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-1">
        <h1 className="text-6xl" style={{ lineHeight: '1' }}>
          {dayNumber}
        </h1>
        <section className="flex flex-col text-xl ">
          <h2 className="font-bold text-muted-foreground uppercase">
            {monthName}
          </h2>
          <p>{year}</p>
        </section>
      </div>

      <h1 className="font-bold text-4xl">{dayName}</h1>
    </div>
  );
}

function TaskList({ tasks, toggleCompleted, handleRemoveTask }: TaskListProps) {
  return (
    <Accordion type="single" collapsible>
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <AccordionItem value={`${task.id}`}>
              <AccordionTrigger>
                <div className="flex flex-row justify-between gap-x-2">
                  <label className="flex justify-center items-center space-x-2">
                    <Checkbox
                      id={`${task.id}`}
                      checked={task.completed}
                      onClick={() => toggleCompleted(task.id)}
                    />

                    <motion.span>
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <p className="text-2xl">{task.task}</p>
                          {task.completed && (
                            <motion.div
                              style={{
                                position: 'relative',
                                bottom: '13px',
                                marginTop: '5', // Adjust this value as needed
                                height: '1px', // Adjust the line height as needed
                                backgroundColor: 'black' // Adjust the line color as needed
                              }}
                              initial={{
                                width: task.completed ? '0%' : '100%'
                              }}
                              animate={{
                                width: task.completed ? '100%' : '0%'
                              }}
                              transition={{ duration: 1 }}
                            />
                          )}
                        </label>
                      </div>
                    </motion.span>
                  </label>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => handleRemoveTask(task.id)}
                >
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
                </Button>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </Accordion>

    // <ul className="overflow-auto p-10 items-center">
    //   <AnimatePresence>
    //     {tasks.map(task => (
    //       <motion.li
    //         key={task.id}
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ duration: 0.7 }}
    //       >
    //         <li className="flex flex-row justify-between gap-x-2">
    //           <label className="flex justify-center items-center space-x-2">
    //             <Checkbox
    //               id={`${task.id}`}
    //               checked={task.completed}
    //               onClick={() => toggleCompleted(task.id)}
    //             />

    //             <motion.span>
    //               <div className="grid gap-1.5 leading-none">
    //                 <label
    //                   htmlFor="terms1"
    //                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                 >
    //                   <p className="text-2xl">{task.task}</p>
    //                   {task.completed && (
    //                     <motion.div
    //                       style={{
    //                         position: 'relative',
    //                         bottom: '13px',
    //                         marginTop: '5', // Adjust this value as needed
    //                         height: '1px', // Adjust the line height as needed
    //                         backgroundColor: 'black' // Adjust the line color as needed
    //                       }}
    //                       initial={{
    //                         width: task.completed ? '0%' : '100%'
    //                       }}
    //                       animate={{
    //                         width: task.completed ? '100%' : '0%'
    //                       }}
    //                       transition={{ duration: 1 }}
    //                     />
    //                   )}
    //                 </label>
    //               </div>
    //             </motion.span>
    //           </label>
    //           <Button
    //             variant="ghost"
    //             size="default"
    //             onClick={() => handleRemoveTask(task.id)}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth="1.5"
    //               stroke="currentColor"
    //               className="w-6 h-6"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    //               />
    //             </svg>
    //           </Button>
    //         </li>
    //       </motion.li>
    //     ))}
    //   </AnimatePresence>
    // </ul>
  );
}

function TaskListInput({ task, setTask, handleAddTask }: TaskListInputProps) {
  return (
    <section className="flex flex-row items-center space-x-2 w-full">
      <Button className="flex flex-row" onClick={handleAddTask}>
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
      </Button>
      <Input
        type="text"
        placeholder="Add a task ..."
        value={task}
        className="outline-none w-full"
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') handleAddTask();
        }}
      />
    </section>
  );
}

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

  return (
    <div className="h-screen w-screen md:w-full dark:bg-background">
      <Card className="h-full w-full flex flex-col border-none">
        <CardHeader>
          <TaskTitle />
        </CardHeader>
        <CardContent className="flex-1">
          <TaskList
            tasks={tasks}
            toggleCompleted={toggleCompleted}
            handleRemoveTask={handleRemoveTask}
          />
        </CardContent>
        <CardFooter>
          <TaskListInput
            task={task}
            setTask={setTask}
            handleAddTask={handleAddTask}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Task;
