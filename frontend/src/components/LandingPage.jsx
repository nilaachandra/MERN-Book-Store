import React from 'react'
import Homepage from './Homepage'

const LandingPage = () => {
  return (
    <div className='w-full flex flex-col gap-3 justify-center items-center'>
          <h1 className='lg:text-8xl text-4xl lg:mt-0 mt-4 text-[#008000] font-bold text-center'>Hey there! Welcome to Kitaabein</h1>
          <img src="https://cdn.leonardo.ai/users/ee1addbc-3561-4b97-9514-c8b34101d932/generations/ffa52d4b-335f-44e1-9ade-f1d0a55e2466/Default_The_front_of_an_aesthetic_looking_book_store_cum_libra_4.jpg" alt="Kitaabein"
           className='rounded-md lg:h-[400px] lg:w-[700px] w-[400px] h-[250px]'/>
<p className='text-xl lg:w-1/2 w-full text-center font-medium italic'>Kitaabein is a Book Store Located at the heart of Silchar Town. Here at Kitaabein you will find a collection of books for every mood, and every need</p>

    </div>
  )
}

export default LandingPage