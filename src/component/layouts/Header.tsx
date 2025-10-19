import React from 'react'
import { useSelector } from 'react-redux'
import LOGO from '../../assets/LifeLogs_Logo.png'

const Header = () => {
    const user = useSelector((store: any) => store.user);
    console.log("user", user)
  return (
    <div className="navbar bg-base-100 shadow-sm fixed z-50 py-0">
        <div className="flex-1">
            <div className='flex items-center'>
                <img alt="lifelog_icon" src={LOGO} className="h-20 w-20 cursor-pointer" />
                <a className="text-xl">LifeLogs</a>
            </div>
            
        </div>
        <div className="flex gap-2">
            {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
            <div className="dropdown dropdown-end">
                <p className='inline'>Welcome {user?.userName} </p>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoUrl} />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header
