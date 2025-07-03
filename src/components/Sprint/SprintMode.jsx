import React, { useState, useEffect } from 'react'
import TaskList from './TaskList'
import ProgressBar from './ProgressBar'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import { useApp } from '../../context/AppContext'
import { formatDuration } from '../../utils/dateHelpers'
import styles from './Sprint.module.css'

export default function SprintMode() {
  const { currentSprint, setCurrentSprint, projects, history, setHistory } = useApp()
  const [showEndModal, setShowEndModal] = useState(false)
  const [duration, setDuration] = useState('')

  const project = projects.find(p => p.id === currentSprint.projectId)
  
  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(currentSprint.startTime)
      const now = new Date()
      setDuration(formatDuration(now - start))
    }, 1000)

    return () => clearInterval(timer)
  }, [currentSprint])

  const handleEndSprint = () => {
    const completedTasks = project.tasks.filter(t => t.completed).length
    
    const historyEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      projectName: project.name,
      duration: new Date() - new Date(currentSprint.startTime),
      tasksCompleted: completedTasks,
      totalTasks: project.tasks.length
    }

    setHistory([historyEntry, ...history])
    setCurrentSprint(null)
    setShowEndModal(false)
  }

  if (!project) return null

  const completedTasks = project.tasks.filter(t => t.completed).length
  const totalTasks = project.tasks.length
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.subtitle}>Sprint Duration: {duration}</p>
        </div>
        <div className={styles.stats}>
          <span className={styles.taskCount}>
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>
      </div>

      <ProgressBar percentage={percentage} />

      <div className={styles.content}>
        <TaskList projectId={project.id} />
      </div>

      <div className={styles.actions}>
        <Button 
          variant="danger" 
          onClick={() => setShowEndModal(true)}
        >
          End Sprint
        </Button>
      </div>

      <Modal
        isOpen={showEndModal}
        onClose={() => setShowEndModal(false)}
        title="⚠️ End Sprint?"
      >
        <p className={styles.modalText}>
          Are you sure you want to end today's sprint? 
          This will break your focus flow.
        </p>
        <div className={styles.modalActions}>
          <Button variant="danger" onClick={handleEndSprint}>
            Yes, End Sprint
          </Button>
          <Button variant="success" onClick={() => setShowEndModal(false)}>
            Stay Focused
          </Button>
        </div>
      </Modal>
    </div>
  )
}
