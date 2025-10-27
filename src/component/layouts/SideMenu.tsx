import { Link } from '@tanstack/react-router'

const SideMenu = () => {
  return (
    
      <ul className="menu [&_li>*]:rounded-none p-0 w-full">
        <li><Link to='/expences' className='text-lg py-3 px-4 hover:bg-[#00d2c45e]'>Expense</Link></li>
        <li><a className='text-lg py-3 px-4 hover:bg-[#00d2c45e]'>Todo</a></li>
        <li><a className='text-lg py-3 px-4 hover:bg-[#00d2c45e]'>Diary</a></li>
    </ul>
  )
}

export default SideMenu
