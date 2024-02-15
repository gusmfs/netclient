import { useContext } from "react"
import { clientContext } from "../providers/clientContext"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectRoutes (){
    const {client} = useContext(clientContext)
    return client ? <Outlet />: <Navigate to="/"/>
}