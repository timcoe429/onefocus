import React from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Layout/Header.jsx'
import ProjectGrid from './components/ProjectSelection/ProjectGrid.jsx'
import SprintMode from './components/Sprint/SprintMode.jsx'
import { useSprint } from './hooks/useSprint'

function AppContent() {
  const { currentSprint } = useSprint()
  
  return (
    <div className="app">
      <Header />
      {currentSprint ? <SprintMode /> : <ProjectGrid />}
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
