import React from 'react'

const SideMenu = () => {
  return (
    
      <ul className="menu [&_li>*]:rounded-none py-3 w-full">
        <li><a>Expense</a></li>
        <li><a>Todo</a></li>
        <li><a>Diary</a></li>
    </ul>
  )
}

export default SideMenu
