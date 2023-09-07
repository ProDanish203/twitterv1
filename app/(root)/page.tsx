"use client"
import { Header } from "@/components/Header";
import { ComposeXheader } from "@/components/forms/ComposeXheader";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetcher } from "@/lib/fetcher";
import { Feed } from "@/components/Feed";

export default function Home() {

  const {data: session} = useSession();
  //@ts-ignore
  const {data, mutate, isLoading, error} = useSWR(`/api/users/${session?.user?.id}`, fetcher);

  if(!session?.user) return null;

  
  return (
    
  <section className="py-2">
    <ToastContainer/>
    <div className="relative">
      <Header label="Home" isBack={false}/>
    </div>
      
    <div className="max-sm:hidden">      
      <ComposeXheader btnTitle="Post" placeholder="What is happening?!" authorImg={data?.user.profileImage ? data?.user.profileImage :data?.user.image} authorId={data?.user.id} authorUsername={data?.user.username}/>
    </div>
      
    <Feed currentUser={data?.user.id}/>

  </section>
  )
}
