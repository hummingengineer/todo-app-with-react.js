/* 새로운 항목을 입력하고 추가할 수 있는 컴포넌트입니다. */
/* state를 통해 인풋의 상태를 관리합니다. */

import React, { useState, useCallback } from 'react' // useState를 통해 인풋에 입력하는 값을 관리.
import { MdAdd }  from 'react-icons/md'
import './TodoInsert.scss'

function TodoInsert ({ onInsert }) {
  const [value, setValue] = useState('')

  const onChange = useCallback(e => {  // 인풋에 넣어 줄 onChange 함수. 컴포넌트가 처음 렌더링 될 때만 함수 생성.
    setValue(e.target.value)           // 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라, 한 번 함수를 만들고 재사용할 수 있도록 useCallback Hook 사용
  }, [])  // 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한번만 함수가 생성

  const onSubmit = useCallback(e => {  // onClick 이벤트로도 만들 수 있지만 form과 onSubmit 이벤트를 사용한 이유는 onSubmit 이벤트의 경우 인풋에서 enter키를 눌렀을 때도 발생하기 때문이다. 반면 버튼에서 onClick만 사용했다면, 인풋에서 onKeyPress 이벤트를 통해 enter키를 감지하는 로직을 따로 작성해야 한다.
    onInsert(value)
    setValue('')  // value 값 초기화
    e.preventDefault()  // submit 이벤트는 브라우저에서 새로고침을 발생시킵니다. 이를 방지하기 위해서 이 함수를 호출합니다.
  }, [onInsert, value])

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>  {/* onSubmit 함수가 호출되면 props로 받아 온 onInsert 함수에 현재 value 값을 파라미터로 넣어서 호출하고, 현재 value 값을 초기화합니다. */}
      <input placeholder="할 일을 입력하세요" value={value} onChange={onChange}/>
      <button type="submit">
        <MdAdd/>
      </button>
    </form>
  )
}

export default TodoInsert
