import { createFileRoute } from '@tanstack/react-router'
import Expense from '../../features/expense/components/Expense'

export const Route = createFileRoute('/expences/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Expense />
}
