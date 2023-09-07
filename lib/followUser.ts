"use client"
import { useSession } from 'next-auth/react';
import React, { useCallback, useMemo } from 'react'
import { fetcher } from './fetcher';
import useSWR from "swr";
import axios from "axios";

export const followUser = (id:string, currentUserId:string) => {
  
    //@ts-ignore
    const {data, mutate, isLoading, error} = useSWR(`/api/users/${currentUserId}`, fetcher);    

    const isFollowing = useMemo(() => {
        const list = data?.user.followingIds || [];

        return list.includes(id)
    }, [id, data?.user.followingIds])

    const toggleFollow = useCallback(async() => {
        try{

            if(isFollowing) {  
                const {data} = await axios.delete(`/users/follow`, {data: {id, currentUserId}})
                console.log(data)
            }else{
                const {data} = await axios.post(`/users/follow`, {id, currentUserId})
                console.log(data)
            }

        }catch(error){
            console.log(error);
        }
    }, [isFollowing, id, currentUserId])

    return {
        isFollowing, 
        toggleFollow
    }

}
