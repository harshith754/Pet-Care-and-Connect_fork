import { connectToDB } from "@/utils/database";
import Pet from "@/models/pet";
import User from '@/models/user'


//route "/api/user/[id]"

export const GET = async (req,{params}) => {

  try {
    await connectToDB();  
    
    const user = await User.findById(params.id);
    if (!user) {
      // If the user doesn't exist, return a 404 error
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200} )
  } catch (error) {

    return new Response("Here", { status: 500} )
  
  }
}