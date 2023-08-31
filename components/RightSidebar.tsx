"use client"
import Image from 'next/image'
import React from 'react'
import { SearchBar } from './helpers/SearchBar'
import { useSession } from 'next-auth/react'
import { fetcher } from '@/lib/fetcher'
import useSWR from "swr";
import Link from 'next/link'

export const RightSidebar = () => {

    const {data: session} = useSession()
    //@ts-ignore
    const {data, mutate, isLoading, error} = useSWR(`/api/users`, fetcher);
    
  return (
    <div className='h-screen lg:min-w-[200px] max-w-[350px] pt-28 lg:w-full w-fit sticky p-7 top-0 left-0 border-l-[1px] border-neutral-800 overflow-hidden'>
        
        <div className='flex flex-col gap-5 w-full items-start justify-between'>

            <SearchBar/>

            <div className='bg-darkAccent py-5 w-[300px] rounded-md'>
                
                <h2 className='text-text text-xl font-semibold mb-4 px-5'>Who to follow</h2>
                <div className='flex flex-col gap-2'>
                {data && data.length > 0 && 
                data.map((user:any) => (
                <div key={user.id} className='flex items-center w-full justify-between gap-3 px-5 py-2 hover:bg-placeolder transition'>

                    <div className='flex items-center gap-2'>
                        <Link href={`/profile/${user.id}`} className='relative w-10 h-10 object-cover'>
                            <Image src={user.profileImage ? user.profileImage : user.image || "/images/dummyUser.png"} className='rounded-full object-cover' fill alt='username'/>
                        </Link>

                        <div>
                            <h6 className='text-text font-semibold md:text-md'>{user.name}</h6>
                            <p className='text-whiteAccent text-sm'>@{user.username}</p>
                        </div>
                    </div>

                    <button className='rounded-full py-1 px-3 bg-white text-bg '>Follow</button>
                </div>
                ))
                }

                


            </div>

            </div>
        </div>

    </div>
  )
}
