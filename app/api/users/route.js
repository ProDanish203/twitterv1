import prisma from "@/lib/db";

export const GET = async (req) => {
    try{
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'asc'
            },
            select:{
                name:true,
                username: true,
                image: true,
                profileImage: true,
                id:true
            }
        });

        if(!users) return new Response(`No users found`, {status: 404});
        return new Response(JSON.stringify(users), {status: 200});
    }catch(error){
        return new Response(`Failed to fecth the resource: ${error.message}`, {status: 500});
    }
}