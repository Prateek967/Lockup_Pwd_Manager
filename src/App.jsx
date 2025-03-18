import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Manger from './Components/Manager'
import About from './Components/About'
import Contact from './Components/Contact'
function App() {
  

  return (
    <>
    <Navbar />
    <Manger />
     <About /> 
      <Contact />
    </>
  )
}

export default App
