import { createBrowserRouter, redirect } from 'react-router-dom'
import Project from '../Project'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/project'),
    errorElement: <div>it is error</div>
  },
  {
    path: '/project',
    element: <Project />,
    errorElement: <div>it is error</div>
  },
  {
    path: '/',
    element: <div>project</div>
  }
])

export default router
