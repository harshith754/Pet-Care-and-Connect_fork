import { connectToDB } from "@/utils/database";
import Pet from "@/models/pet";

//route "/api/pet"

export const GET = async (req) => {

  try {
    await connectToDB();  
    
    const pets = await Pet.find({}).populate('creator');

    return new Response(JSON.stringify(pets), { status: 200} )
  } catch (error) {

    return new Response(error, { status: 500} )
  
  }
}
