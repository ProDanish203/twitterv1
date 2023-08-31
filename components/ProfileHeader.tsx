import Image from 'next/image';
import React from 'react'
import { format } from "date-fns";
import Link from 'next/link';

interface Props{
    profilePicture: string;
    name: string;
    username: string;
    bio: string;
    currentUserProfile: boolean;
    createdAt: string;
    followingCount: number
    followersCount: number;
    userId: string;
}

export const ProfileHeader = ({profilePicture, name, username, bio, currentUserProfile, createdAt, followersCount, followingCount, userId}: Props) => {

    const formattedDate = format(new Date(createdAt), 'MMMM yyyy')

  return (
    <div className='w-full border-b-[1px] border-neutral-800 '>
        <div className='sm:h-[200px] h-[150px] bg-neutral-700 relative w-full'>
                <Image src='/images/picture.jpg' fill alt='jkhae' className='object-cover'/>
            <div className='absolute -bottom-10 left-0 right-0 flex items-center justify-between gap-10 sm:px-7 px-5'>
                <div className='relative md:w-24 md:h-24 w-20 h-20 object-contain'>
                    <Image src={profilePicture || "/images/dummyUser.png"} fill alt={username} className='rounded-full object-cover'/>
                </div>

                <div className='sm:mt-10 mt-16'>
                {currentUserProfile ? (
                    <Link href={`/editProfile/${userId}`}>
                        <button className='rounded-full px-4 py-2 text-text bg-transparent transition-all hover:bg-text hover:text-bg border-[1px] border-text max-sm:text-sm max-sm:py-1 max-sm:px-3 shadow-sm'>Edit Profile</button>
                    </Link>
                    ) : (
                        <div className='flex items-center gap-3'>
                    <i className='far fa-message text-text text-lg cursor-pointer'></i>
                    <button className='rounded-full px-4 py-2 transition-all bg-text text-bg border-[1px] border-text shadow-sm max-sm:text-sm'>Follow</button>
                </div>  
                )}
                </div>

            </div>
        </div>
        

        <div className='mt-14 sm:px-7 px-5 pb-7'>
            <div>
                <p className='text-text sm:text-lg font-semibold leading-5'>{name}</p>
                <p className='text-placeolder max-sm:text-sm'>@{username}</p>
            </div>

            <p className='text-neutral-300 max:sm:text-sm my-4'>{bio}</p>
            
            <div className='mb-4'>
                <div className='flex items-center gap-3'>
                    <i className='far fa-calendar text-neutral-400 text-lg'></i>
                    <p className='max-sm:text-sm text-placeolder'>Joined: {formattedDate}</p>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <p className='text-sm hover:underline text-neutral-400'><span className='text-text font-semibold'>{followingCount}</span> Following</p>

                <p className='text-sm hover:underline text-neutral-400'><span className='text-text font-semibold'>{followersCount}</span> Followers</p>
            </div>
        </div>

    </div>
  )
}
