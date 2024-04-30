import { RiDeleteBack2Fill, RiSendBackward } from '@remixicon/react'
import React from 'react'
import { Link } from 'react-router-dom'
const BackButton = ( { destination = '/' }) => {
  return (
    <div className='flex'>
        <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
            <RiDeleteBack2Fill/>
        </Link>
    </div>
  )
}

export default BackButton