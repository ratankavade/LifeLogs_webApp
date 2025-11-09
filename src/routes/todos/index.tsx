import { createFileRoute } from '@tanstack/react-router'
import SideMenu from '../../component/layouts/SideMenu'
import Header from '../../component/layouts/Header'

export const Route = createFileRoute('/todos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <Header />
      <div className="grid grid-cols-12">
        <div className="mt-20 h-dvh bg-white col-span-2 shadow-sm">
          <SideMenu />
        </div>
        <div className='mt-20 col-span-10 p-6'>
          <div>Hello "/todos/"!</div>
        </div>
      </div>
    </>
  )
}
