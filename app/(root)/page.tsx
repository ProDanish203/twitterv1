"use client"
import { Header } from "@/components/Header";
import { PostCard } from "@/components/cards/PostCard";
import { ComposeXheader } from "@/components/forms/ComposeXheader";
import { fetchUser } from "@/lib/actions/User";
import { UserData } from "@/utils/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const {data: session} = useSession();
  
  const [user, setUser] = useState<UserData>();
  console.log(user);
  const getUser = async () => {
    //@ts-ignore
    const fetchedUser = await fetchUser(session?.user.id)
    //@ts-ignore
    setUser(fetchedUser);
  }
  
  useEffect(() => {
    if(session) getUser;
  }, [session, user])
  
  if(!session?.user) return null;

  
  return (
    
  <section className="py-2">
  
    <div>
      <Header label="Home" isBack={false}/>
    </div>
      
    <div className="max-sm:hidden">      
      {/* <ComposeXheader btnTitle="Post" placeholder="What is happening?!" authorImg={user?.image} authorId={user?.id}/> */}
    </div>
      
    <PostCard isComments={false}/>
    <PostCard isComments={false}/>
    <PostCard isComments={false}/>

  </section>
  )
}
