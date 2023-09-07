import prisma from "@/lib/db";

export const GET = async (request, {params}) => {
    try{
        const {id} = params;
        const post = await prisma.post.findUnique({
            where:{
                id
            },
            include: {
                User: true,
                comments: {
                    include: {
                        User: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })

        if(!post) return new Response(`failed to fetch post`, {status: 500});
        else return new Response(JSON.stringify(post), {status: 201});
    }catch(error){
        return new Response(`Failed to fetch the resource: ${error.message}`, {status: 500});
    }
}