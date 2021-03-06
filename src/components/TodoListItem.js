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

function TodoListItem ({ todo, onRemove, onToggle, style }) {
  const { id, text, checked } = todo
  return (
    <div className="TodoListItem-virtualized" style={style}>  {/* props로 받아온 스타일 적용. TodoListItem-virtualized 클래스를 만든 것은 컴포넌트 사이사이에 테두리를 제대로 쳐 주고, 홀수 번째/짝수 번째 항목에 다른 배경 색상을 설정하기 위함. */}
      <div className="TodoListItem">
        <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
          {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(TodoListItem)  // 이제 TodoListItem 컴포넌트는 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않는다.
                                         // 리렌더링을 방지할 때는 shouldComponentUpdate라는 라이프사이클을 사용하면 되지만, 함수형 컴포넌트에서는 라이프사이클 메서드를 사용할 수 없기 때문에 대신 React.memo라는 함수를 사용한다.
                                         // 컴포넌트의 props가 바뀌지 않았다면, 리렌더링을 하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화해 줄 수 있다. 컴포넌트를 만들고 나서 React.memo로 감싸 주기만 하면 된다.
