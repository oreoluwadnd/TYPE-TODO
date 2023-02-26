
import React, { useEffect, useState } from 'react'
import TodoItem from "../src/components/TodoItem"
import AddTodo from "../src/components/AddTodo"
import { getTodos, addTodo, updateTodo, deleteTodo } from "./Api/API";


const App: React.FC = () => { 
  const [todos, setTodos] = useState<ITodo[] | any>([])
    useEffect(() => {
    fetchTodos()
  }, [])
   const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
   }
  
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ data: { newtodo } }: ITodo []| any) => setTodos([...todos, newtodo]))
      .catch((err: Error) => console.log(err))
  }
  const handleUpdateTodo = ( formData: ITodo): void => {
    updateTodo(formData)
      .then( 
        ({ data: { updatedTodo } }: ITodo | any) => {
          const newTodos: ITodo[] = todos.map((t: ITodo) => {
            return t._id === updatedTodo._id ? updatedTodo : t
          })
          setTodos(newTodos)
        }
      )
      .catch((err: Error) => console.log(err))
  }
  const handleDeleteTodo = (id: string): void => {
    deleteTodo(id)
      .then(({ data: { deletedTodo } }: ITodo | any) => {
        const newTodos: ITodo[] = todos.filter((t: ITodo) => t._id !== deletedTodo._id)
        setTodos(newTodos)
      })
      .catch((err: Error) => console.log(err))
  }
 
  return (
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}



export default App