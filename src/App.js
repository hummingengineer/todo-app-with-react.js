import React, { useState } from 'react'
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트의 기초 알아보기', checked: true },
    { id: 2, text: '컴포넌트 스타일링해 보기', checked: true },
    { id: 3, text: '일정 관리 앱 만들어 보기', checked: false }
  ])

  return (
    <TodoTemplate>
      <TodoInsert/>
      <TodoList todos={todos}/>  {/* todos 배열이 TodoList에 props로 전달된다. TodoList에서 이 값을 받아 TodoItem으로 변환하여 렌더링 된다. */}
    </TodoTemplate>
  )
}

export default App
