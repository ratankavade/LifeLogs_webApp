import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const user = useSelector((store: any) => store.user)
  console.log("user from root", user);

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
