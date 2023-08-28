import Image from 'next/image'
import React from 'react'
import { SearchBar } from './helpers/SearchBar'

export const RightSidebar = () => {
  return (
    <div className='h-screen lg:min-w-[200px] max-w-[350px] lg:w-full w-fit sticky p-7 top-0 left-0 border-l-[1px] border-neutral-800 overflow-hidden'>
        
        <div className='flex flex-col gap-5 w-full items-start justify-between'>

            <SearchBar/>

            <div className='bg-darkAccent py-5 w-[300px] rounded-md'>
                
                <h2 className='text-text text-xl font-semibold mb-4 px-5'>Who to follow</h2>
                <div className='flex flex-col gap-2'>
                
                <div className='flex items-center w-full justify-between gap-3 px-5 py-2 hover:bg-placeolder transition'>

                    <div className='flex items-center gap-2'>
                        <div className='relative w-8 h-8 object-cover'>
                            <Image src="/images/logo.svg" className='rounded-full object-cover' fill alt='username'/>
                        </div>

                        <div>
                            <h6 className='text-text font-semibold md:text-md'>Name</h6>
                            <p className='text-whiteAccent text-sm'>Username</p>
                        </div>
                    </div>

                    <button className='rounded-full py-1 px-3 bg-white text-bg '>Follow</button>
                </div>

                <div className='flex items-center w-full justify-between gap-3 px-5 py-2 hover:bg-placeolder transition'>

                    <div className='flex items-center gap-2'>
                        <div className='relative w-8 h-8 object-cover'>
                            <Image src="/images/logo.svg" className='rounded-full object-cover' fill alt='username'/>
                        </div>

                        <div>
                            <h6 className='text-text font-semibold md:text-md'>Name</h6>
                            <p className='text-whiteAccent text-sm'>Username</p>
                        </div>
                    </div>

                    <button className='rounded-full py-1 px-3 bg-white text-bg '>Follow</button>
                </div>


            </div>

            </div>
        </div>

    </div>
  )
}
