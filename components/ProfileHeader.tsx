import Image from 'next/image';
import React from 'react'

interface Props{
    profilePicture: string;
    name: string;
    username: string;
    bio: string;
    currentUserProfile: boolean;
}

export const ProfileHeader = ({profilePicture, name, username, bio, currentUserProfile}: Props) => {
  return (
    <div className='sm:px-7 px-5 py-7 w-full border-b-[1px] border-neutral-800'>
        
        <div className='flex items-center justify-between gap-10'>
            <div className='relative md:w-20 md:h-20 w-16 h-16 object-contain'>
                <Image src={profilePicture || "/images/dummyUser.png"} fill alt={username} className='rounded-full object-cover'/>
            </div>

            {currentUserProfile ? (
            <button className='rounded-full px-4 py-2 text-text bg-transparent transition-all hover:bg-text hover:text-bg border-[1px] border-text max-sm:text-sm max-sm:py-1 max-sm:px-3 shadow-sm'>Edit Profile</button>
            ) : (
            <div className='flex items-center gap-3'>
                <i className='far fa-message text-text text-lg cursor-pointer'></i>
                <button className='rounded-full px-4 py-2 transition-all bg-text text-bg border-[1px] border-text shadow-sm max-sm:text-sm'>Follow</button>
            </div>  
            )}

        </div>

        <div className='mt-8'>
            <div>
                <p className='text-text sm:text-lg font-semibold leading-5'>{name}</p>
                <p className='text-placeolder max-sm:text-sm'>@{username}</p>
            </div>

            <p className='text-neutral-300 max:sm:text-sm my-4'>{bio}</p>

            <div className='flex items-center gap-4'>
                <p className='text-sm hover:underline text-neutral-400'><span className='text-text font-semibold'>50</span> Following</p>

                <p className='text-sm hover:underline text-neutral-400'><span className='text-text font-semibold'>1000</span> Followers</p>
            </div>
        </div>

    </div>
  )
}
