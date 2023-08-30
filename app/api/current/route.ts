import prisma from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import bcrypt from "bcrypt";

export const GET = async (request:any) => {
    try{

        const { currentUser } = await serverAuth({request});
        
        return new Response(JSON.stringify(currentUser), { status: 201 })

    }catch(error){
        console.log(error);
    }
}
