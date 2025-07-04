import axios from "axios"
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"))
    const [isAdmin , setIsAdmin_] = useState(localStorage.getItem("isAdmin") === 'true')

    const setToken = (newToken,userIsAdmin) => {
        setToken_(newToken)
        setIsAdmin_(userIsAdmin)
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer" + token
            localStorage.setItem('token', token)
            localStorage.setItem('isAdmin',isAdmin)
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
            localStorage.removeItem('isAdmin')
        }
    }, [token,isAdmin])

    const contextValue = useMemo(
        () => ({
            token,
            isAdmin,
            setToken
        }),
        [token,isAdmin]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider
