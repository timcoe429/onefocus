import { useApp } from '../context/AppContext'
import { isSameDay } from '../utils/dateHelpers'

export function useSprint() {
  const { currentSprint, setCurrentSprint } = useApp()

  // Check if sprint is from today
  if (currentSprint && !isSameDay(new Date(currentSprint.startTime), new Date())) {
    setCurrentSprint(null)
  }

  return {
    currentSprint,
    startSprint: (project) => {
      setCurrentSprint({
        projectId: project.id,
        projectName: project.name,
        startTime: new Date().toISOString(),
        tasksAtStart: project.tasks.filter(t => !t.completed).length
      })
    },
    endSprint: () => setCurrentSprint(null)
  }
}
