import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

const Login = ({ setAuth }) => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/auth/google'
    }

    const submit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/auth/signin', form)
            const isAdmin = res.data.user.isAdmin
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isAdmin', isAdmin)
            setAuth({ token: res.data.token, isAdmin })
            navigate(isAdmin ? '/admin' : '/')
        } catch (error) {
            toast.error('Incorrect Email or Password!', { position: 'top-right' })
        }
    }

    return (
        <div>
            <header className="flex bg-black justify-between items-center px-6 py-4 border-b border-gray-700">
                <Link className="text-2xl font-semibold" to='/'><span className="text-white">Event</span><span className="text-cyan-500">Breakers</span></Link>
                <Link to='/signup'><button className="text-amber-50 bg-cyan-500 font-bold px-6 py-2 rounded-md cursor-pointer hover:bg-cyan-600">Sign-up</button></Link>
            </header>
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="bg-black p-8 rounded-md border border-gray-600 shadow-[18px_-18px_0px_0px_#0ff0f7] w-full max-w-sm text-gray-200">
                    <h2 className="text-center text-2xl font-semibold">Login to your <span className="text-cyan-500">account</span></h2>
                    <p className="text-center text-md text-gray-400 mb-6">we do cool tech events  ; )</p>
                    <button onClick={handleGoogleLogin} className="w-full py-2 mt-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-200 transition flex items-center justify-center gap-2 mb-4">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Continue with Google
                    </button>
                    <div className="my-4 border-t border-gray-700"></div>
                    <form onSubmit={submit}>
                        <div className="mb-4"><label className="block text-sm mb-1">Email</label><input type="email" placeholder="you@email.com" onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2 bg-zinc-900 text-white rounded-md border border-zinc-700" /></div>
                        <div className="mb-4"><label className="block text-sm mb-1">Password</label><input type="password" onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-2 bg-zinc-900 text-white rounded-md border border-zinc-700" /></div>
                        <button type="submit" className="cursor-pointer w-full py-2 mt-2 bg-white text-cyan-500 font-semibold rounded-md hover:bg-gray-200 transition">Login</button>
                    </form>
                    <div className="my-4 border-t border-gray-700"></div>
                    <p>New Here ?</p>
                    <Link to='/signup' className="w-full mt-2 py-2 border border-zinc-700 bg-black text-cyan-500 font-medium rounded-md flex items-center justify-center hover:bg-gray-950">Sign-Up</Link>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login