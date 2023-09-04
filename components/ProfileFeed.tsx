"use client"
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import { PostCard } from '@/components/cards/PostCard';
import { ToastContainer } from 'react-toastify';
import loading from "@/app/(root)/loading";


interface Props{
    userId:string;
}

export const ProfileFeed = ({userId} : Props) => {

    const {data: session} = useSession()
    const {data, mutate, isLoading, error} = useSWR(`/api/posts/${userId}`, fetcher);
  
    if(isLoading) return loading();

  return (
    <>
    {
      data?.length > 0 ? 
      data?.map((post:any) => (

        <PostCard key={data.id} data={post} isComments={true} isMedia={false}/>

      ))
      : (
        <div className='p-7'>
        <h2 className='text-text sm:text-xl text-lg font-bold'>No Posts yet</h2>
        </div>
      )
    }
    </>
  )
}
