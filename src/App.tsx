import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import router from './app/router'
import { Provider, useSelector } from 'react-redux'
import appStore from './store/appStore'
import Header from './component/layouts/Header'
import SideMenu from './component/layouts/SideMenu'

function App() {
  const user = useSelector((store: any) => store.user);

  console.log("user", user)

  return (
    <>
        {user && <Header />}
        <div className='grid grid-cols-12'>
          {user && <div className='mt-20 h-dvh bg-white col-span-2 shadow-sm'>
            <SideMenu />
          </div>}
          <div className={user ? 'mt-20 col-span-10 p-4' : 'col-span-12'}>
            <RouterProvider router={router} />
          </div>
          
        </div>
    </>
  )
}

export default App
