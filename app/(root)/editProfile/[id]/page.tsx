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
import { Loader } from "@/components/helpers/Loader";
import { ImageUpload } from '@/components/helpers/ImageUpload';

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
    console.log(data);
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [bio, setBio] = useState("")
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setName(data?.user.name);
        setUsername(data?.user.username);
        setProfileImage(data?.user.profileImage);
        setCoverImage(data?.user.coverImage);
        setBio(data?.user.bio);
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

            const response = await fetch(`/api/users/edit/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name, username, bio, 
                    profileImage, coverImage
                })
            })
            
            if(!response.ok) return toast.error("Unable to edit profile");
            else{
                toast.success("Profile updated successfully");
                router.push(`/profile/${id}`);
            }

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
                <ImageUpload
                value={profileImage}
                onChange={(image:any) => setProfileImage(image)}
                disabled={loader}
                label="Upload Profile Image"
                />  
            </div>

            <div className='mb-4'>
                <ImageUpload
                value={coverImage}
                onChange={(image:any) => setCoverImage(image)}
                disabled={loader}
                label="Upload Cover Image"
                />
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

            <button type='submit' disabled={loader} className='text-text bg-primary disabled:opacity-60 rounded-full px-5 py-2 mt-4 max-w-[150px] w-full shadow-md'>{loader ? <Loader dark={false}/> : "Save"}</button>

        </form>
    </section>
  )
}

export default EditProfile;