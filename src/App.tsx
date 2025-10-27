import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import router from './app/router'
import { Provider } from 'react-redux'
import appStore from './store/appStore'


function App() {
  return (
    <>
      <Provider store={appStore}>
      <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
