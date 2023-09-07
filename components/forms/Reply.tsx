import Image from 'next/image'
import React from 'react'
import useSWR from "swr";
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import loading from '@/app/(root)/loading';


interface Props{
    btnTitle: string;
    placeholder: string; 
}

export const Reply = ({btnTitle, placeholder}:Props) => {

    const {data: session} = useSession();
    //@ts-ignore
    const {data, mutate, isLoading, error} = useSWR(`/api/users/${session?.user?.id}`, fetcher);

    if(isLoading) return loading();
  return (
    <div className="flex items-start gap-0 py-2 px-3 border-b-[1px] border-neutral-800">
        
    <div className="h-full w-[80px]">
        <div className="relative max-md:w-8 max-md:h-8 w-12 h-12 object-contain">
            <Image fill src={`${data?.user.profileImage ? data.user.profileImage : data.image || "/images/dummyUser.png"}`} alt={data.user.username} className='rounded-full object-cover'/>
        </div>
    </div>

    <div className="relative w-full">

        <textarea className="w-full text-text bg-transparent border-b-[1px] border-neutral-800 resize-none mb-1 outline-none"
        placeholder={placeholder}
        >

        </textarea>

        <div className="flex items-center justify-between gap-2">

        <div className="text-primary flex gap-5">
            <i className="far fa-image cursor-pointer"></i>
        </div>

        <button className="text-text bg-primary rounded-full px-5 py-1">{btnTitle}</button>

        </div>

    </div>

    </div>
)
}
