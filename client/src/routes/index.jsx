import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useAuth } from "../provider/authProvider.jsx"
import { ProtectedRoute } from "./ProtectedRoute.jsx"
import ManageEvent from "../adminPages/ManageEvent.jsx"
import Signup from "../pages/Signup.jsx"
import Login from "../pages/Login.jsx"
import Home from "../pages/Home.jsx"
import AdminDashboard from '../adminPages/AdminDashboard.jsx'
import LandingPage from "../pages/LandingPage.jsx"
import CreateEvent from '../adminPages/CreateEvent.jsx'
import {AdminRoute} from '../routes/AdminRoute.jsx'
import EventRegister from "../pages/EventRegister.jsx"
import EditEvent from "../adminPages/EditEvent.jsx"
import LiveEventCard from "../adminPages/LiveEvent.jsx"


const Routes = () => {
    const { token } = useAuth()

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/register',
                    element: <EventRegister/>
                },
                {
                    path: '/logout',
                    element: <div>Logout Page</div>
                },
                {
                    path : '/admin',
                    element : <AdminRoute/>,
                    children : [
                        {
                            path : '/admin',
                            element : <AdminDashboard/> 
                        },
                        {
                            path : '/admin/create',
                            element : <CreateEvent/>
                        },
                        {
                            path : '/admin/liveEvent/:event_id',
                            element : <LiveEventCard/> 
                        },
                        {
                            path : '/admin/edit',
                            element : <EditEvent/> 
                        },
                  ]
                }
            ]
        }
    ]

    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <LandingPage/> 
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        }
    ]

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly
    ])

    return <RouterProvider router={router} />
}

export default Routes
