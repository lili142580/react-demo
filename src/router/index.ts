import { createBrowserRouter } from 'react-router'
import Layout from '@/pages/Layout/index'
import Login from '@/pages/Login/index'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
    },
    {
        path: '/login',
        Component: Login,
    },
])

export default router