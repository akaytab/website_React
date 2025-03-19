import React from "react";
import { useDispatch } from 'react-redux';
import { authService } from "../services/auth";
import { logout } from "../store/authSlice";


function LogoutBtn(){

    const dispatch = useDispatch();
    const logutHandler = ()=>{
        authService.logOut().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button className="inline-block px-6 py-2 duration-20 hover:bg-blue-300 rounded-full" onClick={logutHandler}>Logut</button>
    )
}

export default LogoutBtn