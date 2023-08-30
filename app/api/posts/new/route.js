import prisma from "@/lib/db";

export const POST = async (request , {params}) => {
    try{
        const req = await request.json();
        
        const post = await prisma.post.create({
            data: {
                body: req.text,
                author: req.author
            }
        })

        if(!post) return new Response(`Cannot create post`, {status: 500});
        return new Response("Post created", {status: 201});
    }catch(error){
        return new Response(`Failed to fetch the resource: ${error. message}`, {status: 500});
    }
}