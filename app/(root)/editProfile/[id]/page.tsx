"use client"
import { useSession } from 'next-auth/react';
import loading from './loading';
import { fetcher } from '@/lib/fetcher';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from "swr";
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import Input from '@/components/helpers/Input';
import Image from 'next/image';
import { Loader } from '@/components/helpers/Loader';

const EditProfile = ({params}: {params: {id:string}}) => {

    const router = useRouter();
    const {id} = params;
    const {data: session, status} = useSession();
    if(status !== "loading"){
        //@ts-ignore
    if(session?.user?.id !== id) router.back();
    }
    const {data, mutate, isLoading, error} = useSWR(`/api/users/${id}`, fetcher);
    if(isLoading) return loading();

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setName(data?.user.name);
        setUsername(data?.user.username);
        setProfileImage(data?.user.profileImage);
        setCoverImage(data?.user.coverImage);
        setBio(data?.user.bio);
        setLocation(data?.user.location);
    }, [])

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validations
        if(!username) return toast.error("Username is required")
        if(!name) return toast.error("Name is required")
        if(username.includes(" ")) return toast.error("Username must not contain white spaces");
        if(bio && bio.length > 300) return toast.error("Long bio")

        try{
            setLoader(true);
            console.log(name)
            setLoader(false);
        }catch(error){
            toast.error("Unable to edit profile");
            console.log(error);
            setLoader(false);
        }
    }

  return (
    <section className='min-h-screen'>
        <div>
            <Header isBack={true} label="Edit Profile"/>
        </div>

        <form onSubmit={handleEdit} className='md:px-7 px-5 py-7'>

            <div className='mb-4'>
                <div className='relative md:w-24 md:h-24 w-20 h-20 object-contain'>
                    <Image src={data?.user.image || "/images/dummyUser.png"} fill alt={data?.user.username} className='rounded-full object-cover'/>
                    <label htmlFor='profilePicture' className='absolute flex items-center justify-center top-0 left-0 w-full h-full bg-gray-500 rounded-full opacity-60 z-10 cursor-pointer'>
                        <i className='fas fa-camera text-text text-xl'></i>
                    </label>

                    <input type="file" className='hidden' id='profilePicture'
                    accept=''
                    />
                </div>
            </div>

            <Input placeholder='Name' label="Name" value={name} onChange={(e: any) => setName(e.target.value)}/>
            <Input placeholder='Username' label="Username" value={username} onChange={(e: any) => setUsername(e.target.value)}/>
            <div className='mb-3 flex justify-center flex-col gap-1'>
                <label htmlFor="bio" className='text-neutral-400 ml-1'>Bio</label>
                <textarea name="bio" rows={5} value={bio} onChange={(e:any) => setBio(e.target.value)} id='bio'
                className='text-text bg-transparent outline-none border-[1px] border-neutral-500 px-2 py-2 rounded-md max-w-[500px] w-full resize-none'
                placeholder='Bio'
                ></textarea>
            </div>
            <Input placeholder='Country' label="Country" value={location} onChange={(e: any) => setLocation(e.target.value)}/>

            <button type='submit' className='text-text bg-primary rounded-full px-5 py-2 mt-4 max-w-[150px] w-full shadow-md'>{loader ? "Saving..." : "Save"}</button>

        </form>
    </section>
  )
}

export default EditProfile;