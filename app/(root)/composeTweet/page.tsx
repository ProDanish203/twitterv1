"use client"
import { Header } from '@/components/Header';
import { ComposeXheader } from '@/components/forms/ComposeXheader';
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import useSWR from "swr";

const Compose = () => {

  const {data: session} = useSession();
  //@ts-ignore
  const {data, mutate, isLoading, error} = useSWR(`/api/users/${session?.user?.id}`, fetcher);
  if(!session?.user) return null;

  return (
    <section className='w-full'>
        <div>
          <Header isBack={true} label="Compose"/>
        </div>
        <div className='max-xs:w-screen w-full'>
          <ComposeXheader btnTitle="Post" placeholder="What is happening?!" authorImg={data?.user.image} authorId={data?.user.id} authorUsername={data?.user.username}/>
        </div>
    </section>
  )
}

export default Compose;