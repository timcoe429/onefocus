import React, { useState } from 'react'
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  Input,
  Checkbox,
  Progress,
  Container,
  Heading,
  Divider,
  Badge,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Card,
  CardBody,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { 
  HamburgerIcon, 
  AddIcon, 
  CheckIcon,
  CalendarIcon,
  StarIcon,
  SettingsIcon,
  SearchIcon,
  ChevronRightIcon,
  TimeIcon,
} from '@chakra-ui/icons'

export default function App() {
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState(null)
  const [newProject, setNewProject] = useState({ name: '', description: '', tasks: '' })
  const toast = useToast()

  const handleCreateProject = () => {
    if (!newProject.name) return
    
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
      tasks: tasks.length > 0 ? tasks : [],
      createdAt: new Date().toISOString()
    }

    setProjects([...projects, project])
    setNewProject({ name: '', description: '', tasks: '' })
    onModalClose()
    
    toast({
      title: 'Project created',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const startSprint = (project) => {
    setCurrentProject(project)
    onSidebarClose()
  }

  const toggleTask = (taskId) => {
    if (!currentProject) return
    
    const updatedProject = {
      ...currentProject,
      tasks: currentProject.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }
    
    setCurrentProject(updatedProject)
    setProjects(projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    ))
  }

  const completedTasks = currentProject?.tasks.filter(t => t.completed).length || 0
  const totalTasks = currentProject?.tasks.length || 0
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Flex h="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box
        w="280px"
        bg="white"
        borderRight="1px"
        borderColor="gray.200"
        display={{ base: 'none', md: 'block' }}
      >
        <Sidebar 
          projects={projects} 
          onProjectSelect={startSprint}
          onNewProject={onModalOpen}
          currentProject={currentProject}
        />
      </Box>

      {/* Mobile Menu */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onSidebarOpen}
        variant="ghost"
        aria-label="open menu"
        icon={<HamburgerIcon />}
        position="fixed"
        top={4}
        left={4}
        zIndex={2}
      />

      {/* Main Content */}
      <Flex flex={1} direction="column">
        {/* Header */}
        <Box
          bg="white"
          px={8}
          py={4}
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Flex align="center">
            <Heading size="lg" color="gray.800">
              {currentProject ? currentProject.name : 'OneFocus'}
            </Heading>
            <Spacer />
            <HStack spacing={4}>
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Search tasks..." variant="filled" />
              </InputGroup>
              <Menu>
                <MenuButton>
                  <Avatar size="sm" name="User" />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>

        {/* Content Area */}
        <Box flex={1} overflowY="auto" p={8}>
          {currentProject ? (
            <VStack align="stretch" spacing={6}>
              {/* Progress Section */}
              <Card>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="medium">
                        Today's Progress
                      </Text>
                      <Badge colorScheme="brand" fontSize="md" px={3} py={1}>
                        {completedTasks}/{totalTasks} tasks
                      </Badge>
                    </HStack>
                    <Progress value={progress} size="lg" colorScheme="brand" borderRadius="full" />
                  </VStack>
                </CardBody>
              </Card>

              {/* Tasks */}
              <Card>
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <Heading size="md" mb={2}>Tasks</Heading>
                    {currentProject.tasks.map(task => (
                      <HStack
                        key={task.id}
                        p={3}
                        bg={task.completed ? 'gray.50' : 'white'}
                        borderRadius="md"
                        border="1px"
                        borderColor="gray.200"
                        _hover={{ borderColor: 'gray.300' }}
                        transition="all 0.2s"
                      >
                        <Checkbox
                          isChecked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          colorScheme="brand"
                          size="lg"
                        />
                        <Text
                          flex={1}
                          textDecoration={task.completed ? 'line-through' : 'none'}
                          color={task.completed ? 'gray.500' : 'gray.800'}
                          fontSize="md"
                        >
                          {task.text}
                        </Text>
                      </HStack>
                    ))}
                    
                    <Button
                      leftIcon={<AddIcon />}
                      variant="ghost"
                      colorScheme="brand"
                      justifyContent="flex-start"
                      mt={2}
                    >
                      Add task
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              {/* End Sprint Button */}
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => setCurrentProject(null)}
              >
                End Sprint
              </Button>
            </VStack>
          ) : (
            <Container maxW="container.md" py={20}>
              <VStack spacing={8}>
                <Heading size="2xl" textAlign="center">
                  What's your focus today?
                </Heading>
                <Text fontSize="lg" color="gray.600" textAlign="center">
                  Select a project from the sidebar or create a new one to start your daily sprint.
                </Text>
                <Button
                  size="lg"
                  leftIcon={<AddIcon />}
                  onClick={onModalOpen}
                  colorScheme="brand"
                >
                  Create New Project
                </Button>
              </VStack>
            </Container>
          )}
        </Box>
      </Flex>

      {/* Mobile Sidebar Drawer */}
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Projects</DrawerHeader>
          <DrawerBody p={0}>
            <Sidebar 
              projects={projects} 
              onProjectSelect={(project) => {
                startSprint(project)
                onSidebarClose()
              }}
              onNewProject={() => {
                onModalOpen()
                onSidebarClose()
              }}
              currentProject={currentProject}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* New Project Modal */}
      <Modal isOpen={isModalOpen} onClose={onModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Project Name</FormLabel>
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="e.g., Launch Website"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="What's this project about?"
                  rows={3}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Initial Tasks (one per line)</FormLabel>
                <Textarea
                  value={newProject.tasks}
                  onChange={(e) => setNewProject({...newProject, tasks: e.target.value})}
                  placeholder="Design homepage&#10;Set up database&#10;Create API"
                  rows={5}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onModalClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleCreateProject}>
              Create Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

// Sidebar Component
function Sidebar({ projects, onProjectSelect, onNewProject, currentProject }) {
  return (
    <VStack h="full" p={4} align="stretch" spacing={6}>
      <VStack align="stretch" spacing={2}>
        <Text fontSize="sm" fontWeight="bold" color="gray.500" px={3}>
          FOCUS MODE
        </Text>
        <Button
          leftIcon={<TimeIcon />}
          justifyContent="flex-start"
          variant="ghost"
          isActive={!currentProject}
        >
          Today
        </Button>
      </VStack>

      <Divider />

      <VStack align="stretch" spacing={2} flex={1}>
        <HStack justify="space-between" px={3}>
          <Text fontSize="sm" fontWeight="bold" color="gray.500">
            PROJECTS
          </Text>
          <IconButton
            icon={<AddIcon />}
            size="xs"
            variant="ghost"
            onClick={onNewProject}
          />
        </HStack>
        
        {projects.map(project => {
          const completed = project.tasks.filter(t => t.completed).length
          const total = project.tasks.length
          
          return (
            <Button
              key={project.id}
              justifyContent="space-between"
              variant="ghost"
              isActive={currentProject?.id === project.id}
              onClick={() => onProjectSelect(project)}
              px={3}
            >
              <HStack flex={1}>
                <Box w={2} h={2} bg="brand.500" borderRadius="full" />
                <Text>{project.name}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                {completed}/{total}
              </Text>
            </Button>
          )
        })}
      </VStack>
    </VStack>
  )
}
