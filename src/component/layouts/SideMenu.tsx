import { Link } from '@tanstack/react-router'

const SideMenu = () => {
  return (
      <ul className="menu [&_li>*]:rounded-none p-0 w-full ">
        <li><Link to='/expences' activeProps={{className: 'bg-accent text-white'}} className='text-lg py-3 px-4 text-black hover:bg-accent hover:text-white'>Expense</Link></li>
        <li><Link to='/todos' activeProps={{className: 'bg-accent text-white'}} className='text-lg py-3 px-4 text-black hover:bg-accent hover:text-white'>Todo</Link></li>
        <li><Link to='/diary' activeProps={{className: 'bg-accent text-white'}} className='text-lg py-3 px-4 text-black hover:bg-accent hover:text-white'>Diary</Link></li>
    </ul>
  )
}

export default SideMenu
