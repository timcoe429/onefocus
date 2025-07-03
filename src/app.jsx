import React from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Layout/Header'
import ProjectSelection from './components/ProjectSelection/ProjectGrid'
import SprintMode from './components/Sprint/SprintMode'
import { useSprint } from './hooks/useSprint'

function AppContent() {
  const { currentSprint } = useSprint()
  
  return (
    <div className="app">
      <Header />
      {currentSprint ? <SprintMode /> : <ProjectSelection />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
