"use client"
import { Header } from '@/components/Header';
import { fetcher } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import loading from './loading';
import { ProfileHeader } from '@/components/ProfileHeader';
import { PostCard } from '@/components/cards/PostCard';
import { ToastContainer } from 'react-toastify';
import { ProfileFeed } from '@/components/ProfileFeed';

const Profile = ({params}: {params: {id:string}}) => {

  const {data: session} = useSession()

  const {id} = params;
  const {data, mutate, isLoading, error} = useSWR(`/api/users/${id}`, fetcher);

  if(isLoading) return loading();

  return (
  <section className='w-full relative'>
    <ToastContainer/>
    <div>
      {/* @ts-ignore */}
      <Header isBack={true} label={session?.user?.id === data?.user.id ? `Your Profile`: `${data.user.username}'s Profile`}/>
    </div>
    {/* @ts-ignore */}
    <ProfileHeader profilePicture={data?.user.profileImage ? data?.user.profileImage : data?.user.image} username={data?.user.username} name={data?.user.name} bio={data?.user.bio} currentUserProfile={session?.user?.id === data?.user.id} createdAt={data?.user.createdAt} followingCount={data?.user.followingIds.length} followersCount={data?.user.followersIds.length} userId={data?.user.id} banner={data?.user.coverImage}/>

    <ProfileFeed userId={data.user.id}/>
      
  </section>
  )
}

export default Profile;