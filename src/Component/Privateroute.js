import React,{useContext} from 'react'
import { Navigate } from 'react-router';
import { Authcontext } from '../Context/Authcontext'

function Privateroute({children}) {
    const {user}=useContext(Authcontext);

    return (
        user ? children : <Navigate to='/login'/> 
    )
}

export default Privateroute