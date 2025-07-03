import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import styles from './Sprint.module.css'

export default function TaskList({ projectId }) {
  const { projects, setProjects } = useApp()
  const [newTaskText, setNewTaskText] = useState('')
  
  const project = projects.find(p => p.id === projectId)

  const toggleTask = (taskId) => {
    setProjects(projects.map(p => 
      p.id === projectId
        ? {
            ...p,
            tasks: p.tasks.map(t => 
              t.id === taskId 
                ? { ...t, completed: !t.completed }
                : t
            )
          }
        : p
    ))
  }

  const addTask = (e) => {
    e.preventDefault()
    if (!newTaskText.trim()) return

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false
    }

    setProjects(projects.map(p => 
      p.id === projectId
        ? { ...p, tasks: [...p.tasks, newTask] }
        : p
    ))

    setNewTaskText('')
  }

  return (
    <div className={styles.taskList}>
      {project.tasks.map(task => (
        <div 
          key={task.id} 
          className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className={styles.checkbox}
          />
          <span className={styles.taskText}>{task.text}</span>
        </div>
      ))}

      <form onSubmit={addTask} className={styles.addTaskForm}>
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          placeholder="Add new task..."
          className={styles.taskInput}
        />
        <button type="submit" className={styles.addButton}>
          +
        </button>
      </form>
    </div>
  )
}
