import React from 'react'
import { Navigate , Outlet } from "react-router-dom"
import getUserRole from '../provider/userRoleProvider.js'

export const AdminRoute = () =>{
    const isAdmin = getUserRole()

    if(isAdmin){
        return <Outlet/>
    }

    return <Navigate to="/" />
}

