import prisma from "@/lib/db";

export const GET = async (request , {params}) => {
    try{
        const {userId} = params;
        
        const posts = await prisma.post.findMany({
            where: {
                author: userId
            },
            include: {
                User: true,
                comments: true
            },
            orderBy:{ 
                createdAt: "asc"
            }
        })

        if(!posts) return new Response(`No Posts Yet`, {status: 500});
        else{
            
            return new Response(JSON.stringify(posts), {status: 201});
        }
    }catch(error){
        return new Response(`Failed to fetch the resource: ${error. message}`, {status: 500});
    }
}