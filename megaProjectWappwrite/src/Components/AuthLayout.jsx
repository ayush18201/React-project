import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom' 
import authService from '../appwrite/auth'
import {useSelector} from 'react-redux' 

export default function Protected ({
    authentication = true,
    children
}){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.isLoggedIn)
    console.log(authStatus,"auyhst")
    useEffect(()=>{
        if(authentication && authentication !== authStatus){
            navigate('/login')
        }else if(!authentication && authentication !== authStatus){
            navigate('/')
        }
     setLoader(false)
    },[authentication, navigate, authStatus])
return  loader ? <h1>isLoading...</h1> : <>{children}</>
}
