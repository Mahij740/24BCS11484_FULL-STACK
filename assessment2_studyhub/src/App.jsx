import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  memo,
} from 'react'
import './App.css'

const student = {
  name: 'Mahi Jain',
  email: 'mahij740@gmail.com',
  year: '3rd Year',
}

const initialTasks = [
  { id: 1, title: 'Finish DBMS assignment', completed: false },
  { id: 2, title: 'Revise React hooks', completed: false },
  { id: 3, title: 'Submit lab report', completed: true },
]

const StudentContext = createContext(null)

function StudentProvider({ children }) {
  return (
    <StudentContext.Provider value={student}>{children}</StudentContext.Provider>
  )
}

function useUser() {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error('useUser must be used within a StudentProvider')
  }

  return context
}

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const title = action.payload.trim()
      if (!title) return tasks

      return [
        ...tasks,
        {
          id: Date.now(),
          title,
          completed: false,
        },
      ]
    }

    case 'TOGGLE_TASK':
      return tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      )

    case 'DELETE_TASK':
      return tasks.filter((task) => task.id !== action.payload)

    default:
      return tasks
  }
}

function useTaskManager(initialTaskList) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTaskList)

  const addTask = useCallback((title) => {
    dispatch({ type: 'ADD_TASK', payload: title })
  }, [])

  const toggleTask = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId })
  }, [])

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
  }, [])

  return { tasks, addTask, toggleTask, deleteTask }
}

function Header() {
  const user = useUser()

  return (
    <header className="app-header">
      <h1>STUDYHUB</h1>
      <p className="welcome-text">Welcome, {user.name} ({user.year})</p>
    </header>
  )
}

function ProfilePanel() {
  const user = useUser()

  return (
    <section className="profile-panel">
      <h2>Student Details</h2>
      <div className="divider" />
      <div className="profile-row">
        <span>Name:</span>
        <strong>{user.name}</strong>
      </div>
      <div className="profile-row">
        <span>Email:</span>
        <strong>{user.email}</strong>
      </div>
      <div className="profile-row">
        <span>Year:</span>
        <strong>{user.year}</strong>
      </div>
    </section>
  )
}

function TaskStats({ tasks }) {
  const stats = useMemo(() => {
    const total = tasks.length
    const remaining = tasks.filter((task) => !task.completed).length

    return { total, remaining }
  }, [tasks])

  return (
    <h2 className="tasks-heading">
      MY TASKS ({stats.remaining} remaining / {stats.total} total)
    </h2>
  )
}

function AddTaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!newTask.trim()) return

    onAdd(newTask)
    setNewTask('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task" className="sr-only">
        New task
      </label>
      <input
        id="new-task"
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        placeholder="New task"
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      </label>
      <button type="button" className="delete-button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  )
})

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

function TaskManager() {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskManager(initialTasks)

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed)),
    [tasks],
  )

  return (
    <section className="task-manager">
      <TaskStats tasks={tasks} />
      <div className="divider" />
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={sortedTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </section>
  )
}

function App() {
  return (
    <StudentProvider>
      <div className="app-shell">
        <Header />
        <ProfilePanel />
        <TaskManager />
      </div>
    </StudentProvider>
  )
}

export default App
