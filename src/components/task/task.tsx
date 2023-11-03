'use client';

import React, { useEffect, useState } from 'react';
import useTask from '@/store/useTask';
import { AnimatePresence, motion } from 'framer-motion';
import { ModeToggle } from '../mode-toggle';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { current, getFullDateTime } from '@/utils/time';
import { Task } from '@/store/useTask';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Icons } from '../ui/icons';

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
          {current.dayNumber}
        </h1>
        <section className="flex flex-col text-xl ">
          <h2 className="font-bold text-muted-foreground uppercase">
            {current.monthName}
          </h2>
          <p>{current.year}</p>
        </section>
      </div>

      <h1 className="font-bold text-4xl">{current.dayName}</h1>
    </div>
  );
}

function TaskList({ tasks, toggleCompleted, handleRemoveTask }: TaskListProps) {
  return (
    <Accordion type="single" collapsible>
      <AnimatePresence>
        {tasks.map(task => {
          const date = new Date(task.date);
          const taskDate = getFullDateTime(date);

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <AccordionItem value={`${task.id}`}>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`${task.id}`}
                    checked={task.completed}
                    onClick={() => toggleCompleted(task.id)}
                  />
                  <div className="w-full">
                    <AccordionTrigger>
                      <motion.span>
                        <div className="grid gap-1.5 leading-none col-span">
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
                    </AccordionTrigger>
                  </div>
                </div>
                <AccordionContent>
                  <div className="flex flex-row justify-between items-center">
                    <section>
                      <Badge>{taskDate.formattedDate}</Badge>
                      <Badge variant={'secondary'}>
                        {taskDate.formattedTime}
                      </Badge>
                    </section>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveTask(task.id)}
                    >
                      <Icons.trash />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Accordion>
  );
}

function TaskListInput({ task, setTask, handleAddTask }: TaskListInputProps) {
  return (
    <section className="flex flex-row items-center space-x-2 w-full">
      <Button className="flex flex-row" onClick={handleAddTask}>
        <Icons.add />
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
