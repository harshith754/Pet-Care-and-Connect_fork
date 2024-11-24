import { connectToDB } from "@/utils/database";

import Pet from "@/models/pet";

import Adoption from "@/models/adoption";

import User from "@/models/user"; 

export const POST = async (req) => {

  const { name, email, address, phoneNumber, user, pet,comments,petCreator } = await req.json();

  try {
    const newAdoption= new Adoption({
      user,
      email,
      name,
      pet,
      address,
      phoneNumber,
      comments,
      petCreator
    })
  
    console.log(newAdoption)

    await newAdoption.save()

    return new Response(JSON.stringify(newAdoption), { status: 201} )
    
  } catch (error) {

    return new Response(error, { status: 500} )
  
  }


}