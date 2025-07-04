import {jwtDecode} from 'jwt-decode'

const token = localStorage.getItem('token')
var userRole = false

if(token){
    const decoded = jwtDecode(token)
    userRole = decoded.isAdmin
}

const getUserRole = () => {
    return userRole
}

export default getUserRole
