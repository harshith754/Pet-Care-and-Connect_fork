import Adoption from "@/models/adoption";
import Pet from "@/models/pet";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";




//updates status

export const PUT = async (req,{params})=> {

  const id= params.id;

  const {status}= await req.json();
  

  try {
    await connectToDB();
    console.log(id);

    const existingAdoption = await Adoption.findById(id);

    if(status) existingAdoption.status=status;


    await existingAdoption.save();

    return new Response("Status Updated!", {status:"201" ,success:"true"});

  } catch (e){
    console.log(e)
  }


}