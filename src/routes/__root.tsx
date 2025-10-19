import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import Header from '../component/layouts/Header'
import SideMenu from '../component/layouts/SideMenu'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const user = useSelector((store: any) => store.user)
  console.log("user from root", user);

  return (
    <React.Fragment>
      {user && <Header />}
      <div className="grid grid-cols-12">
        {user && (
          <div className="mt-20 h-dvh bg-white col-span-2 shadow-sm">
            <SideMenu />
          </div>
        )}
        <div className={user ? 'mt-20 col-span-10 p-6' : 'col-span-12'}>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  )
}
