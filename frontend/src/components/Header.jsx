import { RiBook2Fill } from '@remixicon/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Header = () => {
    const path = useLocation()
  return (
    <header className='w-full'>
        <nav className='w-full flex justify-between'>
            <Link to='/' className="logo flex gap-3 items-center">
                <RiBook2Fill color='green' size={36}/>
                <h1 className='text-4xl font-bold text-[#008000]'>Kitaabein</h1>
            </Link>
            <Link to={path.pathname === '/' ? '/home' : '/' } className='py-2 px-4 bg-[#008000] rounded-md text-white font-bold hover:opacity-70 transition-all duration-150'>
                {path.pathname === '/' ? <span>Dashboard</span> : <span>Go Back</span>}
            </Link>
        </nav>
    </header>
  )
}

export default Header