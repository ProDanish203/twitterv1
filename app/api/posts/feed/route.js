import prisma from "@/lib/db";

export const GET = async (request) => {
    try{
        
        const posts = await prisma.post.findMany({
            include: {
                User: true,
                comments: true
            },
            orderBy:{ 
                createdAt: "desc"
            }
        })

        if(!posts) return new Response(`No Posts Yet`, {status: 500});
        else return new Response(JSON.stringify(posts), {status: 201});
    }catch(error){
        return new Response(`Failed to fetch the resource: ${error.message}`, {status: 500});
    }
}