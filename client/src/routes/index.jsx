import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Signup from "../pages/Signup.jsx"
import Login from "../pages/Login.jsx"
import Logout from "../pages/Logout.jsx"
import Home from "../pages/Home.jsx"
import AdminDashboard from '../adminPages/AdminDashboard.jsx'
import CreateEvent from "../adminPages/CreateEvent.jsx"
import EventRegister from "../pages/EventRegister.jsx"
import EditEvent from "../adminPages/EditEvent.jsx"
import LiveEventCard from "../adminPages/LiveEvent.jsx"

const getInitialAuth = () => {
    const token = localStorage.getItem("token")
    const isAdmin = localStorage.getItem("isAdmin") === 'true'
    return { token, isAdmin }
}

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getInitialAuth)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const tokenParam = params.get('token')
        const userData = params.get('user')
        
        if (tokenParam && userData) {
            try {
                const user = JSON.parse(decodeURIComponent(userData))
                localStorage.setItem('token', tokenParam)
                localStorage.setItem('isAdmin', user.isAdmin)
                setAuth({ token: tokenParam, isAdmin: user.isAdmin })
                window.history.replaceState({}, document.title, '/')
            } catch (e) {
                console.error(e)
            }
        }
        setLoading(false)
    }, [])

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
    }

    return children(auth, setAuth)
}

const ProtectedRoute = ({ auth, requireAdmin, children }) => {
    if (!auth.token) return <Navigate to="/login" replace />
    if (requireAdmin && !auth.isAdmin) return <Navigate to="/" replace />
    if (!requireAdmin && auth.isAdmin) return <Navigate to="/admin" replace />
    return children
}

const PublicRoute = ({ auth, children }) => {
    if (auth.token) return <Navigate to={auth.isAdmin ? "/admin" : "/"} replace />
    return children
}

const AppRoutes = () => {
    return (
        <AuthProvider>
            {(auth, setAuth) => (
                <Routes>
                    <Route path="/login" element={<PublicRoute auth={auth}><Login setAuth={setAuth} /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute auth={auth}><Signup setAuth={setAuth} /></PublicRoute>} />
                    <Route path="/" element={<ProtectedRoute auth={auth}><Home /></ProtectedRoute>} />
                    <Route path="/register" element={<ProtectedRoute auth={auth}><EventRegister /></ProtectedRoute>} />
                    <Route path="/logout" element={<ProtectedRoute auth={auth}><Logout setAuth={setAuth} /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute auth={auth} requireAdmin><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/admin/create" element={<ProtectedRoute auth={auth} requireAdmin><CreateEvent /></ProtectedRoute>} />
                    <Route path="/admin/liveEvent/:event_id" element={<ProtectedRoute auth={auth} requireAdmin><LiveEventCard /></ProtectedRoute>} />
                    <Route path="/admin/edit/:event_id" element={<ProtectedRoute auth={auth} requireAdmin><EditEvent /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            )}
        </AuthProvider>
    )
}

const AppRouter = () => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
)

export default AppRouter