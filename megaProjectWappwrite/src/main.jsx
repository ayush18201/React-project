import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from './store/store.js'
import { Route, RouterProvider } from 'react-router-dom'
import Home from './Components/Pages/Home.jsx'
import LoginPage from './Components/Pages/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import AllPosts from './Components/Pages/AllPosts.jsx'
import AddPost from './Components/Pages/AddPost.jsx'
import EditPost from './Components/Pages/EditPost.jsx'
import {createBrowserRouter} from 'react-router-dom'
import Protected from './Components/AuthLayout.jsx'
import Post from './Components/Pages/Post.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: ( <Protected authentication ={false}>
          <LoginPage />
        </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authentication ={false}>
          <SignUp />
        </Protected>
)
      },
      {
        path: "/all-posts",
        element: (
            <Protected authentication>
                {" "}
                <AllPosts />
            </Protected>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Protected authentication>
                {" "}
                <AddPost />
            </Protected>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Protected authentication>
                {" "}
                <EditPost />
            </Protected>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
],
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <RouterProvider router={router}>
      <Route />
    </RouterProvider>
  </Provider>,
)
