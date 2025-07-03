import React, { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [projects, setProjects] = useLocalStorage('onefocus_projects', [])
  const [currentSprint, setCurrentSprint] = useLocalStorage('onefocus_sprint', null)
  const [history, setHistory] = useLocalStorage('onefocus_history', [])

  const value = {
    projects,
    setProjects,
    currentSprint,
    setCurrentSprint,
    history,
    setHistory
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
