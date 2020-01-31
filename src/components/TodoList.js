/* todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여 줍니다. */

import React, { useCallback } from 'react'
import { List } from 'react-virtualized'  // 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 도와주는 라이브러리. 스크롤되면 해당 스크롤 위치에서 보여주어야 할 컴포넌트를 자연스럽게 렌더링해준다.
import TodoListItem from './TodoListItem'
import './TodoList.scss'

function TodoList ({ todos, onRemove, onToggle }) {
  // rowRenderer 함수는 react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며
  // 이 함수를 List 컴포넌트의 props로 설정해 주어야 한다.
  // 이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아와서 사용한다.
  const rowRenderer = useCallback( ({ index, key, style }) => {  // 인자 값에서 바로 구조분해 할당
    const todo = todos[index]
    return (
      <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style}/>
    )
  }, [onRemove, onToggle, todos])

  return (
    <List                      // List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 그리고 배열을 props로 넣어 주어야 한다. 그러면 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화해 준다.
      className="TodoList"
      width={512}  // 전체 크기
      height={513}  // 전체 높이
      rowCount={todos.length}  // 항목 개수
      rowHeight={57}  // 항목 높이
      rowRenderer={rowRenderer}  // 항목을 렌더링할 때 쓰는 함수
      list={todos}  // 배열
      style={{ outline: 'none' }}  // List에 기본 적용되는 outline 스타일 제거
    />
  )
}

export default React.memo(TodoList)  // 컴포넌트의 props가 바뀌지 않았다면, 리렌더링을 하지 않도록 설정
                                     // 리스트 관련 컴포넌트 작성 시, 리스트 아이템과 리스트 두 가지 컴포넌트를 최적화해 주도록 한다.
