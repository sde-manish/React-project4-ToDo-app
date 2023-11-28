import { useEffect, useState } from 'react'
import { ToDoProvider } from './Context/ToDoContext'
import './App.css'
import TodoForm from './Components/ToDoForm'
import TodoItem from './Components/ToDoItem'

function App() {
  const [ToDos, setToDos] = useState([])

  const addTodo = (todo) => {
    setToDos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setToDos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setToDos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setToDos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const ToDos = JSON.parse(localStorage.getItem("ToDos"))

    if (ToDos && ToDos.length > 0) {
      setToDos(ToDos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ToDos", JSON.stringify(ToDos))
  }, [ToDos])
  



  return (
    <ToDoProvider value={{ToDos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your ToDos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {ToDos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </ToDoProvider>
  )
}

export default App