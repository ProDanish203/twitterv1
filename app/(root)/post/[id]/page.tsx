"use client"
import { Header } from '@/components/Header';
import { PostCard } from '@/components/cards/PostCard';
import { ComposeXheader } from '@/components/forms/ComposeXheader';
import { Reply } from '@/components/forms/Reply';
import useSWR from "swr";
import loading from './loading';
import React from 'react'
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';

const Post = ({params}: {params: {id: string}}) => {

  const {id} = params;

  const session = useSession();

  const {data, mutate, isLoading, error} = useSWR(`/api/posts/post/${id}`, fetcher);

  if(isLoading) return loading();

  return (
    <section>
    <div>
        <Header label="Post" isBack={true}/>
    </div>

    <PostCard isComments={false} isMedia={false} data={data}/>
    {session.status === "authenticated" && (
      <Reply btnTitle='Reply' placeholder='Add reply'/>
    )}
    {/* <PostCard isComments={true}/> */}
    </section>
  )
}

export default Post;