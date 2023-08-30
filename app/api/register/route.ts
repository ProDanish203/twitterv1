import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export const POST = async (request:any) => {
    try{

        const { name, username, email, password } = request.json();

        const hashPass = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                username,
                password: hashPass
            }
        });
        
        return new Response(JSON.stringify(user), { status: 201 })

    }catch(error){
        console.log(error);
    }
}
