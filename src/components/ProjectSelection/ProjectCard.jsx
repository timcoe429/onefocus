import React from 'react'
import { useApp } from '../../context/AppContext'
import styles from './ProjectSelection.module.css'

export default function ProjectCard({ project }) {
  const { setCurrentSprint } = useApp()
  
  const completedTasks = project.tasks.filter(t => t.completed).length
  const totalTasks = project.tasks.length
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const handleStartSprint = () => {
    setCurrentSprint({
      projectId: project.id,
      projectName: project.name,
      startTime: new Date().toISOString(),
      tasksAtStart: project.tasks.filter(t => !t.completed).length
    })
  }

  return (
    <div className={styles.card} onClick={handleStartSprint}>
      <h3 className={styles.cardTitle}>{project.name}</h3>
      {project.description && (
        <p className={styles.cardDescription}>{project.description}</p>
      )}
      <div className={styles.cardStats}>
        <span>{completedTasks}/{totalTasks} tasks</span>
        <span className={styles.cardProgress}>{percentage}%</span>
      </div>
      <div className={styles.cardProgressBar}>
        <div 
          className={styles.cardProgressFill} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
