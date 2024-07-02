import './App.css'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import Header from './components/Header'

function App() {

  return (
    <div className='w-full h-screen '>
      <Header />
      <Container sx={{ mt: 10, pt: 'env(safe-area-inset-top)' }} maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  )
}

export default App
