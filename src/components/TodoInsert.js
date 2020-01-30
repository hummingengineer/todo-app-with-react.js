/* 새로운 항목을 입력하고 추가할 수 있는 컴포넌트입니다. */
/* state를 통해 인풋의 상태를 관리합니다. */

import React, { useState, useCallback } from 'react' // useState를 통해 인풋에 입력하는 값을 관리.
import { MdAdd }  from 'react-icons/md'
import './TodoInsert.scss'

function TodoInsert () {
  const [value, setValue] = useState('')
  const onChange = useCallback(e => {  // 인풋에 넣어 줄 onChange 함수. 컴포넌트가 처음 렌더링 될 때만 함수 생성.
    setValue(e.target.value)           // 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라, 한 번 함수를 만들고 재사용할 수 있도록 useCallback Hook 사용
  }, [])  // 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한번만 함수가 생성

  return (
    <form className="TodoInsert">
      <input placeholder="할 일을 입력하세요" value={value} onChange={onChange}/>
      <button type="submit">
        <MdAdd/>
      </button>
    </form>
  )
}

export default TodoInsert
