import React, { useState, useRef, useCallback } from 'react'
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트의 기초 알아보기', checked: true },
    { id: 2, text: '컴포넌트 스타일링해 보기', checked: true },
    { id: 3, text: '일정 관리 앱 만들어 보기', checked: false }
  ])

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4)  // useState가 아닌 useRef를 사용하여 컴포넌트에서 사용할 변수를 만드는 이유는 id 값은 렌더링되는 정보가 아니기 때문이다. 단순히 새로운 항목을 만들 때 참조되는 값일 뿐이다.
  const onInsert = useCallback(text => {                      // todos 배열에 새 객체를 추가하는 onInsert 함수. props로 전달해야 할 함수를 만들 때는 useCallback을 사용하여 함수를 감싸는 것을 습관화 하자.
    const todo = { id: nextId.current, text, checked: false }
    setTodos(todos.concat(todo))
    nextId.current += 1  // nextId 1씩 더하기
  }, [todos])  // todos가 바뀌었을 때만 함수 생성

  const onRemove = useCallback(id => {  // App 컴포넌트에서 id를 파라미터로 받아 와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
    setTodos(todos.filter(todo => todo.id !== id))
  }, [todos])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove}/>  {/* todos 배열이 TodoList에 props로 전달된다. TodoList에서 이 값을 받아 TodoItem으로 변환하여 렌더링 된다. */}
    </TodoTemplate>
  )
}

export default App
