import { getSession } from "next-auth/react";
import prisma from "./db";

const serverAuth = async (req:any) => {
    try{
        const session = await getSession({req});

        if(!session?.user?.email){
            throw new Error('Not signed in');
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if(!currentUser){
            throw new Error('Not signed in');
        }

        return { currentUser };
    }catch(error:any){
        throw new Error(`Something went wrong: ${error.message}`)
    }
}

export default serverAuth;
