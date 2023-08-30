"use client"
import { navItems } from '@/utils/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { UserData } from '@/utils/types';
import { fetchUser } from '@/lib/actions/User';

export const BottomBar = () => {

    const pathName = usePathname();
    const {data: session} = useSession()

    const [user, setUser] = useState<UserData>();
    // console.log(user);
    const getUser = async () => {
        try{
            //@ts-ignore
            const fetchedUser = await fetchUser(session?.user.id)
            //@ts-ignore
            setUser(fetchedUser);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        if(session) getUser();
    }, [session])

  return (
    
    <div className='fixed bottom-0 left-0 right-0 glassmorphism p-4 px-6 w-full'>
        {user && (
        <nav className='flex items-center justify-between gap-3 '>
            {navItems.map((link) =>{
                const isActive = (pathName.includes(link.title) && link.path.length > 1) || pathName === link.path;
                if(link.path === "/profile") link.path = `/profile/${user.id}`
    
                return (
                    <Link href={link.path} key={link.path} className={`${isActive ? "text-primary": "text-text"}`}>
                        <i className={`${link.icon}`}></i>
                    </Link>
                )
            } )}
        </nav>
        )}
        
    </div>
  )
}
