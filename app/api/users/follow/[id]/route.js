import prisma from "@/lib/db";
import { GET } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const POST = async (req, {params}) => {
    try{
        const {id} = params;
        const session = await getServerSession(GET);
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        let updatedFollowing = [...(user.followingIds || [])]
        updatedFollowing.push(id);

        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                followingIds: updatedFollowing
            }
        })

        if(!user) return new Response(`User not found`, {status: 404});
        return new Response(JSON.stringify(updatedUser), {status: 200});
    }catch(error){
        return new Response(`Failed to fecth the resource: ${error.message}`, {status: 500});
    }
}


export const DELETE = async (req, {params}) => {
    try{
        const {id} = params;
        const session = await getServerSession(GET);

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        let updatedFollowing = [...(user.followingIds || [])]
        updatedFollowing = updatedFollowing.filter(followingId => followingId != id)

        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                followingIds: updatedFollowing
            }
        })

        if(!user) return new Response(`User not found`, {status: 404});
        return new Response(JSON.stringify(updatedUser), {status: 200});
    }catch(error){
        return new Response(`Failed to fecth the resource: ${error.message}`, {status: 500});
    }
}
