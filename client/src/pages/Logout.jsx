import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = ({ setAuth }) => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('isAdmin')
        setAuth({ token: null, isAdmin: false })
        navigate('/')
    }, [navigate, setAuth])

    return null
}

export default Logout