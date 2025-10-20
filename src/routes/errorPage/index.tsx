import { createFileRoute } from '@tanstack/react-router'
import ErrorScreen from '../../features/error/components/ErrorScreen'

export const Route = createFileRoute('/errorPage/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ErrorScreen />
}
