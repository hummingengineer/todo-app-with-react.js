/* todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여 줍니다. */

import React from 'react'
import TodoListItem from './TodoListItem'
import './TodoList.scss'

function TodoList ({ todos, onRemove }) {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove}/> /* props로 받아 온 todos 배열을 배열 내장 함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링 */
      ))}
    </div>
  )
}

export default TodoList
