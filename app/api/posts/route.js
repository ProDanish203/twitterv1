export const GET = async (req) => {
    try{
        return new Response(req);
    }catch(error){
        return new Response(`Failed to fecth the resource: ${error.message}`);
    }
}