import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white'>
    <div className='mycontainer flex justify-around
    items-center px-4 py-5 h-16'>
      
      <div className="logo font-bold text-white text-1xl" 
        
      >
        <span className='text-yellow-200'>/ &lt;</span>

         Lock
        <span className='text-yellow-200'>-Up/ &gt;</span>
        
        
        
        </div>
    <ul>
    <li className='flex gap-4'>
    <a className='hover:font-bold' href='#'>Home</a>
    <a className='hover:font-bold' href='#'>About</a>
    <a className='hover:font-bold' href='#'>Contact</a>
    </li>
    
    </ul>
    
    </div>
    
    </nav>
  )
}

export default Navbar