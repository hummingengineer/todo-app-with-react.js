/* 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트입니다. */
/* todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여 줍니다. */

import React from 'react'
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline
} from 'react-icons/md'
import cn from 'classnames' /* 조건부 스타일링을 위해 classnames를 사용 */
import './TodoListItem.scss'

function TodoListItem ({ todo }) {
  const { text, checked } = todo
  return (
    <div className="TodoListItem">
      <div className={cn('checkbox', { checked })}>
        { checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
        <div className="text">{text}</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline/>
      </div>
    </div>
  )
}

export default TodoListItem
