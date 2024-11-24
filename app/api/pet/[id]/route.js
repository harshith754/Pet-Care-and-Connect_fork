import { connectToDB } from "@/utils/database";
import Pet from "@/models/pet";


//route "/api/pet/[id]"

export const GET = async (req,{params}) => {

  try {
    await connectToDB();  
    
    const pet = await Pet.findById(params.id).populate('creator');
    if (!pet) {
      // If the pet doesn't exist, return a 404 error
      return new Response("Pet not found", { status: 404 });
    }

    return new Response(JSON.stringify(pet), { status: 200} )
  } catch (error) {

    return new Response(error, { status: 500} )
  
  }
}


export const PUT = async (req,{params}) => {
  const { name ,city ,petType ,breed ,age ,gender, size,userId,imageId } = await req.json();

  const id= params.id 
  try {
    await connectToDB();  //need to connect every time since its lambda function(will die after finishing job)
    console.log(id)
    const existingPet = await Pet.findById(id);

    if (!existingPet) {
      // If the pet doesn't exist, return a 404 error
      return new Response("Pet not found", { status: 404 });
    }

    // Update the pet's information
    existingPet.name = name;
    existingPet.city = city;
    existingPet.petType = petType;
    existingPet.breed = breed;
    existingPet.age = age;
    existingPet.gender = gender;
    existingPet.size = size;
    existingPet.creator = userId;
    existingPet.imageId = imageId;

    // Save the updated pet
    await existingPet.save();

    return new Response("Pet Updated!!", { status: 201 });
    
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}

export const DELETE = async (req,{params}) => {
  console.log(params.id)
  try {
    await connectToDB();  
    
    const existingPet = await Pet.findById(params.id).populate('creator');

    if (!existingPet) {
      // If the pet doesn't exist, return a 404 error
      return new Response("Pet not found", { status: 404 });
    }

    // Delete the pet
    await existingPet.deleteOne();

    return new Response("Pet Deleted!", { status: 201 });

  } catch (error) {
    return new Response(error, { status: 500 });
  }
}







