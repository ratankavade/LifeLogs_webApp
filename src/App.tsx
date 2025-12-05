import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import router from './app/router'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistor } from "./store/appStore";


function App() {
  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
