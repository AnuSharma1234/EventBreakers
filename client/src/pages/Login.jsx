import { useAuth } from "../provider/authProvider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import React from "react"
import axios from "axios"
import { toast , ToastContainer } from "react-toastify"

const Login = () => {
    const {setToken} = useAuth()

    const [form , setForm] = useState({
        email : '',
        password : ''
    })

    const handleError = (error) =>{
        toast.error(error ,{
            position : 'top-right'
        })
    }

    const navigate = useNavigate()

    const submit = async e =>{
        e.preventDefault();

        try{
            const res = await axios.post('http://localhost:5000/auth/signin',form)
            const isAdmin = res.data.user.isAdmin

            setToken(res.data.token,isAdmin)

            if(isAdmin === 'true'){
                navigate('/admin')
            }else{
                navigate('/')
            }

        }catch(error){
            console.log(error.message)
            handleError('Incorrect Email or Password!')
        }
    }

    return (
        <div>
        <header className="flex bg-black justify-between items-center px-6 py-4 border-b border-gray-700">
            <Link className="text-2xl font-semibold" to='/'>
          <span className="text-white">Event</span>
          <span className="text-cyan-500">Breakers</span>
        </Link>
        <div className="space-x-4">
         <Link to='/signup'><button className="text-amber-50 bg-cyan-500 font-bold px-6 py-2 rounded-md text-8 cursor-pointer hover:bg-cyan-600">Sign-up</button></Link>
       </div>
        </header>
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div id="main_div" className="bg-black backdrop-blur-lg p-8 rounded-md border border-gray-600 shadow-[18px_-18px_0px_0px_#0ff0f7] w-full max-w-sm mb-36 text-gray-200 mr-8">
                <h2 className="text-center text-2xl font-semibold">Login to your <span className="text-cyan-500">account</span></h2>
                <p className="text-center text-md text-gray-400 mb-6">
                    we do cool tech events  ; ) 
                </p>

                <form onSubmit={submit}>

                    <div className="mb-4">
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@email.com"
                            onChange={(e) => setForm({...form , email : e.target.value})}
                            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setForm({...form , password : e.target.value})}
                            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                    </div>

                    <button className="cursor-pointer w-full py-2 mt-2 bg-white text-cyan-500 font-semibold rounded-md hover:bg-gray-200 transition"
                        type="submit">
                        Login
                    </button>
                </form>
                <div className="my-4 border-t border-gray-700"></div>
                <p>New Here ?</p>
                <Link  to='/signup' className="w-full mt-2 py-2 border border-zinc-700 bg-black text-cyan-500 font-medium rounded-md flex items-center justify-center hover:bg-gray-950">
                    Sign-Up
                </Link>
            </div>
        </div>
            <ToastContainer/>
        </div>
    )
}

export default Login
