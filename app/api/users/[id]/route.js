import prisma from "@/lib/db";

export const GET = async (req, {params}) => {
    try{
        const {id} = params;
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        const followersCount = await prisma.user.count({
            where: {
                followersIds: {
                    has: id
                }
            }
        })

        if(!user) return new Response(`User not found`, {status: 404});

        return new Response(JSON.stringify({user: user, followersCount: followersCount}), {status: 200});
    }catch(error){
        return new Response(`Failed to fecth the resource: ${error.message}`, {status: 500});
    }
}