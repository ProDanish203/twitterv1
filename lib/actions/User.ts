"use server"
import prisma from "../db"

export const fetchUser = async (id:string) => {
    try{
        const user = await prisma.user.findUnique({
            where: {id: id}
        });
        if(!user) return;
        return user;
    }catch(error){
        console.log(error);
    }
}