import React from 'react'
import { PostCard } from './cards/PostCard';
import { useSession } from 'next-auth/react';
import useSWR from "swr"
import loading from '@/app/(root)/loading';
import { fetcher } from '@/lib/fetcher';

interface Props{
  currentUser: string;
}



export const Feed = ({currentUser}: Props) => {

  const {data: session} = useSession();
  const {data, mutate, isLoading, error} = useSWR(`/api/posts/feed`, fetcher);

  if(isLoading) return loading();

  return (
    <div>
    {
      data.length > 0 ?
      data.map((post:any) => (
        <PostCard key={post.id} data={post} isComments={true} isMedia={false}/>
      ))
      : (
        <h3 className='text-text text-xl font-semibold sm:px-7 px-3 sm:py-7 py-5'>Nothing to show :&#40;</h3>
      )
    }
    {/* <PostCard isComments={false} isMedia={false} data={data}/> */}
    </div>
  )
}
