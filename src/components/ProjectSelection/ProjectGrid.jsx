import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import { useApp } from '../../context/AppContext'
import styles from './ProjectSelection.module.css'

export default function ProjectGrid() {
  const { projects, setProjects } = useApp()
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    tasks: ''
  })

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return

    const tasks = newProject.tasks
      .split('\n')
      .filter(t => t.trim())
      .map(text => ({
        id: Date.now() + Math.random(),
        text: text.trim(),
        completed: false
      }))

    const project = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description,
      tasks: tasks.length > 0 ? tasks : [{
        id: Date.now(),
        text: 'Define first task',
        completed: false
      }],
      createdAt: new Date().toISOString()
    }

    setProjects([...projects, project])
    setNewProject({ name: '', description: '', tasks: '' })
    setShowNewProject(false)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.prompt}>What's your focus today?</h2>
      
      <div className={styles.grid}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Button 
        variant="success" 
        onClick={() => setShowNewProject(true)}
        className={styles.newButton}
      >
        + Create New Project
      </Button>

      <Modal 
        isOpen={showNewProject} 
        onClose={() => setShowNewProject(false)}
        title="Create New Project"
      >
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>Project Name</label>
            <input
              type="text"
              value={newProject.name}
              onChange={e => setNewProject({...newProject, name: e.target.value})}
              placeholder="Enter project name..."
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description (Optional)</label>
            <textarea
              value={newProject.description}
              onChange={e => setNewProject({...newProject, description: e.target.value})}
              placeholder="What's this project about?"
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Initial Tasks (One per line)</label>
            <textarea
              value={newProject.tasks}
              onChange={e => setNewProject({...newProject, tasks: e.target.value})}
              placeholder="Task 1&#10;Task 2&#10;Task 3"
              rows={5}
            />
          </div>

          <div className={styles.formActions}>
            <Button variant="success" onClick={handleCreateProject}>
              Create Project
            </Button>
            <Button onClick={() => setShowNewProject(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
