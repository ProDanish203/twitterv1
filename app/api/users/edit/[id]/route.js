import prisma from "@/lib/db";

export const PUT = async (req, {params}) => {
    try{
        const {id} = params;
        const {name, username, bio, profileImage, coverImage} = await req.json();
        
        if(!name || !username) return new Response(`Missing fields`, {status: 404});
        
        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name, username, bio, profileImage, coverImage
            }
        })

        console.log(updateUser);
        
        if(!updateUser) return new Response(`Unable to update profile`, {status: 404});

        return new Response(JSON.stringify(updateUser), {status: 200});
    }catch(error){
        return new Response(`Failed to fecth the resource: ${error}`, {status: 500});
    }
}