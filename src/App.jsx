import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { default as Main } from './layout/Main';
import { Everything, Topic, Search, New } from './pages';

const queryClient = new QueryClient()

function App() {
  const routes = createBrowserRouter([{
    element: <Main />,
      children: [
        {
          path: '/',
          element: <New />
        },
        {
          path: '/everything',
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
          path: '/search',
          element: <Search />
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
