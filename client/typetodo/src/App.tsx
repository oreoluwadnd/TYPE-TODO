
import React, { useEffect, useState } from 'react'
import TodoItem from "../src/components/TodoItem"
import AddTodo from "../src/components/AddTodo"
import { getTodos, addTodo, updateTodo, deleteTodo } from "./Api/API";


const App: React.FC = () => { 
  const [todos , setTodos] = useState<ITodo[]>([])
   const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
   }
  
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ data: { todo } }: ITodo | any) => setTodos([...todos, todo]))
      .catch((err: Error) => console.log(err))
  }
  const handleUpdateTodo = ( formData: ITodo): void => {
    updateTodo(formData)
      .then(({ data: { todo } }: ITodo | any) => setTodos([...todos, todo]))
      .catch((err: Error) => console.log(err))
  }
  const handleDeleteTodo = (id: string): void => {
    deleteTodo(id)
      .then(({ data: { message } }: ITodo | any) => setTodos([...todos, message]))
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