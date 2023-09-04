import prisma from "@/lib/db";

export const POST = async (request , {params}) => {
    try{
        const req = await request.json();
        
        const user = await prisma.user.findUnique({
            where:{
                id: req.author
            }
        })

        if(!user) return new Response(`Authentication Error`, {status: 500});

        const post = await prisma.post.create({
            data: {
                body: req.text,
                author: req.author
            }
        })

        if(!post) return new Response(`Cannot create post`, {status: 500});
        else{
            const updateUser = await prisma.user.update({
                where: {
                    id: req.author
                },
                data: {
                    posts: user.posts
                }
            })
            return new Response("Post created", {status: 201});
        }
    }catch(error){
        return new Response(`Failed to fetch the resource: ${error. message}`, {status: 500});
    }
}