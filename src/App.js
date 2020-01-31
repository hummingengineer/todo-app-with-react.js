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
    setTodos(todos => todos.concat(todo))  // 어떻게 업데이트할지 정의해 주는 업데이트 함수를 넣어줌. setTodos를 사용할 때, 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣는다 이를 함수형 업데이트라고 부른다.
    nextId.current += 1  // nextId 1씩 더하기
  }, [])

  // useCallback 함수는 두번째 파라미터인 배열에 들어있는 값을 감시해서 배열 안의 값이 바뀌면 함수를 새로 생성하게 된다.
  // 이 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어졌었다.
  // 이를 방지하기 위해 useCallback 함수 두번째 파라미터에 비어있는 배열을 넣어줌으로써 컴포넌트가 렌더링될 때 단 한 번만 함수가 생성되게 만들고,
  // setTodos 함수에 todos 값을 인자로 받는 함수를 넣어주어 todos 값을 받아 filter로 변환한 다음 결과 값(배열)을 반환하게 만든다.
  // 반환 받은 결과 값을 setTodos에서 인자로 받아 사용하게 된다.
  // 요점은, useCallback 함수를 통해 onRemove 함수가 최초에 한번만 렌더링 되게 만든 다음
  // 변환되는 값은 함수에다가 넣어 onRemove 함수가 값이 아닌 (화살표)함수와 함수에서 반환되는 값에 의존하도록 만드는 것이다.
  // setTodos는 함수 원형 자체를 사용할 뿐이고,
  // 변화하는 값인 todos는 파라미터로 들어갈 뿐이기 때문에 영향을 주지 않는다.
  // setTodos의 인자 값을 계산식으로 받도록 하는 함수형 프로그래밍 방법을 쓴 것이다. (값도 계산식으로 받을 수 있다.)
  const onRemove = useCallback(id => {  // App 컴포넌트에서 id를 파라미터로 받아 와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  // 배열 내장 함수 map을 사용하여 특정 id를 가지고 있는 객체의 checked 값을 반전 시켜준다.
  const onToggle = useCallback(id => {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo))  // todo.id와 id값이 다를 때는 변화를 주지 않고 처음 받아 왔던 상태 그대로 반환한다. map 함수는 배열을 전체적으로 새로운 형태로 변환하여 새로운 배열을 생성해야 할 때 사용.
  }, [])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>  {/* todos 배열이 TodoList에 props로 전달된다. TodoList에서 이 값을 받아 TodoItem으로 변환하여 렌더링 된다. */}
    </TodoTemplate>
  )
}

export default App
