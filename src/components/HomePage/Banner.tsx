import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-center mt-20 gap-14'>
        <div className=''>
            <h1 className='text-6xl font-semibold pb-5 leading-tight'>
                Host,Connect, <br /> Celebrate:  Your <br /> Events,  our Platfrom!
            </h1>
            <h3 className='w-[70%] py-2 font-semibold'>
                Book and Learn helpful tips from our mentors in world class companies
            </h3>

            <button className='bg-blue-700 px-5 py-2 text-white rounded-2xl'>Explore Now</button>
        </div>
        <div>
            <Image src={'/hero.png'} height={350} width={350} alt='hero'/>
        </div>
    </div>
  )
}

export default Banner