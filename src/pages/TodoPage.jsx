import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';
import { todosAPI } from '../api/todos'

const TodoPage = () => {
  const { getTodos, createTodo, deleteTodo, updateTodo } = todosAPI
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const handleChange = value => {  setInputValue(value)  }
  // 新增
  const handleAddTodo = async e => { 
    if (inputValue.length === 0) return
    const todo = await createTodo(inputValue, false)
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          ...todo,
          isEdit: false
        }]
    })
    setInputValue('');
  }
  // 更改狀態
  const handleToggleDone = async (id, isDone) => {
    const prams = {
      isDone: !isDone
    }
    await updateTodo(id, prams)
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id)
          return {
            ...todo,
            isDone: !todo.isDone
          }
        return todo
      })
    })
  }
  // 啟閉編輯
  const handleChangeMode = (id, isEdit) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id)
          return {
            ...todo,
            isEdit
          }
        return {...todo, isEdit: false}
      })
    })
  }
  // 更新 title
  const handleSave = async (id, title) => {
    const prams = {
      title
    }
    await updateTodo(id, prams)
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id)
          return {
            ...todo,
            title,
            isEdit: false
          }
        return {...todo}
      })
    })
  }
  // 刪除
  const handleDelete = async (id) => {
    await deleteTodo(id)
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id)
    })
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos()
      setTodos(todos.map(todo => ({...todo, isEdit: false})))
    }
    fetchTodos()
  }, [getTodos]);

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleAddTodo}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer />
    </div>
  );
};

export default TodoPage;
