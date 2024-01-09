import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { default as Main } from './layout/Main';
import { Everything, Topic } from './pages';

const queryClient = new QueryClient()

function App() {
  const routes = createBrowserRouter([{
    element: <Main />,
      children: [
        {
          path: '/',
          element: <Everything />
        },
        {
          path: '/all',
          element: <Everything />
        },
        {
          path: '/topic/:topic',
          element: <Topic />
        },
        {
          path: '*',
          element: <h1>Page Not Found</h1>
        }
      ]
  }])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}/>
    </QueryClientProvider>
  )
}

export default App
