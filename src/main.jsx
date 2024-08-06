import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Gif from './components/Gif'
import Home from './components/Home'
import Creator from './components/Creator'
import App from './App'
import ErrorPage from './components/ErrorPage'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { green,indigo,orange, pink } from '@mui/material/colors'

let theme = createTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  },
})

theme = responsiveFontSizes(theme)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: '/create',
            element: <Creator />,
          },
          {
            path: '/gifs',
            element: <Gif />,
          },
        ],
      },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} ></RouterProvider>
  </ThemeProvider>
)
