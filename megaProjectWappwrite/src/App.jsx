import React, { useState, useEffect } from 'react'
import authService from './appwrite/auth';
import {useDispatch} from 'react-redux'
import {isUserLoggedIn, isUserLoggedOut} from './features/AuthSlice'
import {Outlet} from 'react-router-dom' 
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

import './App.css'

function App() {
 const [isLoading, setIsLoading]= useState(true);
 const dispatch = useDispatch()

 useEffect(()=>{

  authService.getCurrentUser()
  .then((userData)=> {
    if(userData){
      console.log(userData, "userr")
      dispatch(isUserLoggedIn({userData}))
    }else{
      dispatch(isUserLoggedOut())
    }
  })
  .finally(()=> setIsLoading(false))
   
 },[])

  return (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      </div>
      </div>
    </>
  )
}

export default App
