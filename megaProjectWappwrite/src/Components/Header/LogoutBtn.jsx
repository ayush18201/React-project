import React from 'react'
import authService from '../../appwrite/auth'
import {useDispatch} from 'react-redux'
import {isUserLoggedOut} from '../../features/AuthSlice'

function LogoutBtn(){

    const dispatch = useDispatch()

    const handleLogout = () =>{
        authService.logout()
        .then(()=>{
            dispatch(isUserLoggedOut())
        })
    }
  
    return(
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={handleLogout}
        >Logout</button>
    )

}

export default LogoutBtn