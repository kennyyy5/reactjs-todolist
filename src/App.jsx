import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todoValue, setTodoValue] = useState('')

const [todos, setTodos] = useState([
  "Go to the gym",
    "Eat more fruits and veggies",
    "Pick up the kids from school"
])

function persistData(newList){
  localStorage.setItem('todos', JSON.stringify({todos:newList}))
}

function handleAddTodos(newTodo){
  const newTodoList = [...todos, newTodo]
  persistData(newTodoList)
  setTodos(newTodoList)
}

function handleDeleteTodos(index){
   const newTodoList = todos.filter((todo, todoIndex) =>{
    return todoIndex !== index
   })
   persistData(newTodoList)
   setTodos(newTodoList)
}

function handleEditTodos(index){
   const editValue = todos[index]
   setTodoValue(editValue)
   handleDeleteTodos(index)
}

useEffect(()=>{
  if(!localStorage){
    return
  }

  let localTodos = localStorage.getItem('todos')
  if(!localTodos){
    return
  }

  localTodos = JSON.parse(localTodos).todos
  setTodos(localTodos)
},[])

  return (
    <>
     <TodoInput todoValue={todoValue} setTodoValue = {setTodoValue} handleAddTodos = {handleAddTodos}/>
     <TodoList handleEditTodos={handleEditTodos} handleDeleteTodos = {handleDeleteTodos} todos = {todos}/>
    </>
  )
}

export default App
