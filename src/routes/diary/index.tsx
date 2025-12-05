import { createFileRoute } from '@tanstack/react-router'
import Header from '../../component/layouts/Header'
import SideMenu from '../../component/layouts/SideMenu'
import TodaysDiary from '../../features/diary/components/TodaysDiary'

export const Route = createFileRoute('/diary/')({
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
          <TodaysDiary />
        </div>
      </div>
    </>
  )
}
